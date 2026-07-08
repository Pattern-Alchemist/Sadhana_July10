#!/usr/bin/env python3
"""
AstroKalki — Embedding Generator for pgvector Semantic Search
==============================================================

Generates embeddings for each siddhi in the corpus and writes them to the
siddhis.embedding column (pgvector format).

Usage:
  python3 scripts/generate_embeddings.py --model text-embedding-3-small --api-key $OPENAI_API_KEY

Or with a local model:
  python3 scripts/generate_embeddings.py --local model.onnx

The script:
  1. Reads all siddhis from the database (via DATABASE_URL)
  2. For each siddhi, concatenates: name + sanskrit + summary + description + primary_mantra
  3. Generates an embedding via the chosen model
  4. Writes the embedding back to the siddhis.embedding column as a pgvector literal

Prerequisites:
  - PostgreSQL with the pgvector extension enabled
  - `CREATE EXTENSION IF NOT EXISTS vector;` run on the database
  - `ALTER TABLE siddhis ADD COLUMN embedding vector(1536);` (or the appropriate dimension)
  - The embedding model accessible (OpenAI API key, or a local ONNX model)

This is a BUILD-TIME script — it does not run at request time.
"""

import argparse
import os
import sys
import json
import urllib.request
import urllib.error
from typing import List, Optional

try:
    import psycopg2
except ImportError:
    print("ERROR: psycopg2 not installed. Run: pip install psycopg2-binary", file=sys.stderr)
    sys.exit(1)


def get_siddhis(database_url: str) -> List[dict]:
    """Read all siddhis from the database."""
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    cur.execute("""
        SELECT slug, name, COALESCE(sanskrit, ''), COALESCE(summary, ''),
               COALESCE(description, ''), COALESCE(primary_mantra, '')
        FROM siddhis
        ORDER BY slug;
    """)
    rows = cur.fetchall()
    conn.close()
    return [
        {
            "slug": r[0],
            "name": r[1],
            "sanskrit": r[2],
            "summary": r[3],
            "description": r[4],
            "primary_mantra": r[5],
        }
        for r in rows
    ]


def build_text(s: dict) -> str:
    """Build the text to embed for a siddhi."""
    parts = [s["name"], s["sanskrit"], s["summary"], s["description"], s["primary_mantra"]]
    return " ".join(p for p in parts if p).strip()


def embed_openai(texts: List[str], model: str, api_key: str) -> List[List[float]]:
    """Generate embeddings via OpenAI API."""
    embeddings = []
    batch_size = 100
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i + batch_size]
        payload = json.dumps({"model": model, "input": batch}).encode("utf-8")
        req = urllib.request.Request(
            "https://api.openai.com/v1/embeddings",
            data=payload,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                embeddings.extend([d["embedding"] for d in data["data"]])
                print(f"  embedded batch {i//batch_size + 1}/{(len(texts) + batch_size - 1)//batch_size}")
        except urllib.error.HTTPError as e:
            print(f"  API error: {e.code} {e.reason}", file=sys.stderr)
            sys.exit(1)
    return embeddings


def embed_local(texts: List[str], model_path: str) -> List[List[float]]:
    """Generate embeddings via a local ONNX model (placeholder)."""
    print("Local embedding is a placeholder — implement with onnxruntime + sentence-transformers.", file=sys.stderr)
    print(f"Would load: {model_path}", file=sys.stderr)
    print("For now, returning zero vectors.", file=sys.stderr)
    return [[0.0] * 384 for _ in texts]  # placeholder


def write_embeddings(database_url: str, slug_to_embedding: dict, dimension: int):
    """Write embeddings back to the siddhis.embedding column."""
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()

    # Ensure pgvector extension and embedding column exist
    cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
    cur.execute(f"""
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                           WHERE table_name = 'siddhis' AND column_name = 'embedding') THEN
                EXECUTE 'ALTER TABLE siddhis ADD COLUMN embedding vector({dimension});';
            END IF;
        END$$;
    """)

    for slug, emb in slug_to_embedding.items():
        vector_literal = f"[{','.join(str(x) for x in emb)}]"
        cur.execute(
            "UPDATE siddhis SET embedding = %s::vector WHERE slug = %s;",
            (vector_literal, slug),
        )

    conn.commit()
    conn.close()
    print(f"  wrote {len(slug_to_embedding)} embeddings to siddhis.embedding")


def main():
    parser = argparse.ArgumentParser(description="Generate embeddings for pgvector semantic search.")
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"),
                        help="PostgreSQL connection string (or set DATABASE_URL env var)")
    parser.add_argument("--model", default="text-embedding-3-small",
                        help="OpenAI embedding model name (default: text-embedding-3-small, 1536 dims)")
    parser.add_argument("--api-key", default=os.environ.get("OPENAI_API_KEY"),
                        help="OpenAI API key (or set OPENAI_API_KEY env var)")
    parser.add_argument("--local", help="Path to a local ONNX model (alternative to OpenAI)")
    args = parser.parse_args()

    if not args.database_url:
        print("ERROR: DATABASE_URL is required.", file=sys.stderr)
        sys.exit(1)

    print(f"Reading siddhis from {args.database_url[:50]}...")
    siddhis = get_siddhis(args.database_url)
    print(f"  found {len(siddhis)} siddhis")

    texts = [build_text(s) for s in siddhis]
    print(f"\nGenerating embeddings ({len(texts)} texts)...")

    if args.local:
        embeddings = embed_local(texts, args.local)
        dimension = len(embeddings[0]) if embeddings else 384
    elif args.api_key:
        embeddings = embed_openai(texts, args.model, args.api_key)
        dimension = len(embeddings[0]) if embeddings else 1536
    else:
        print("ERROR: Either --api-key (OpenAI) or --local (ONNX model) is required.", file=sys.stderr)
        sys.exit(1)

    print(f"\nWriting embeddings (dimension={dimension}) to database...")
    slug_to_embedding = {s["slug"]: emb for s, emb in zip(siddhis, embeddings)}
    write_embeddings(args.database_url, slug_to_embedding, dimension)

    print(f"\nDone. {len(siddhis)} siddhis now have embeddings.")
    print("The /api/archivist/semantic endpoint can now serve semantic search.")


if __name__ == "__main__":
    main()
