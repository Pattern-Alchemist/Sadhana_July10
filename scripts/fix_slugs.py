#!/usr/bin/env python3
"""Fix diacritic-mangled slugs in knowledge archive metadata."""
import json
import re
from pathlib import Path

KNOWLEDGE_ROOT = Path("/home/z/my-project/workspace/Arena_Export/knowledge")

# IAST to ASCII mapping
FOLD = {
    "ā": "a", "á": "a", "à": "a", "â": "a",
    "ī": "i", "í": "i", "ì": "i", "î": "i",
    "ū": "u", "ú": "u", "ù": "u", "û": "u",
    "ṛ": "r", "ṝ": "r", "ṅ": "n", "ñ": "n",
    "ṭ": "t", "ḍ": "d", "ṇ": "n", "ś": "s",
    "ṣ": "s", "ḥ": "h", "ṃ": "m", "̈": "",
    "—": "-", "–": "-", "’": "", "‘": "",
    "©": "", "®": "",
}

def fold(s: str) -> str:
    for k, v in FOLD.items():
        s = s.replace(k, v)
    return s

def slugify(name: str) -> str:
    s = fold(name).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s

# Better slug mapping based on titles
TITLE_TO_SLUG = {
    "Agni Māraṇa Tantra": "agni-marana-tantra",
    "Nimbu Mantra Siddhi Sādhana Manual": "nimbu-mantra-siddhi-sadhana-manual",
    "Sādhanās and Kriyās Collected": "sadhanas-and-kriyas-collected",
    "Vīrudha-Āhāra Māraṇa — The Energetic Food Poison Curse": "virudha-ahara-marana-energetic-food-poison-curse",
}

# Old slug → new slug
RENAMES = {
    "agni-m-ra-a-tantra": "agni-marana-tantra",
    "nimbu-mantra-siddhi-s-dhana-manual": "nimbu-mantra-siddhi-sadhana-manual",
    "s-dhan-s-and-kriy-s-collected": "sadhanas-and-kriyas-collected",
    "v-rudha-h-ra-m-ra-a-the-energetic-food-poison-curse": "virudha-ahara-marana-energetic-food-poison-curse",
}

# Rename metadata files
for old, new in RENAMES.items():
    old_meta = KNOWLEDGE_ROOT / "metadata" / f"{old}.json"
    new_meta = KNOWLEDGE_ROOT / "metadata" / f"{new}.json"
    if old_meta.exists():
        meta = json.loads(old_meta.read_text(encoding="utf-8"))
        meta["slug"] = new
        new_meta.write_text(json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8")
        old_meta.unlink()
        print(f"  metadata: {old} -> {new}")

    old_chunks = KNOWLEDGE_ROOT / "chunks" / f"{old}.jsonl"
    new_chunks = KNOWLEDGE_ROOT / "chunks" / f"{new}.jsonl"
    if old_chunks.exists():
        # Rewrite doc_slug in each line
        lines = []
        for line in old_chunks.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            obj = json.loads(line)
            obj["doc_slug"] = new
            obj["id"] = obj["id"].replace(old, new)
            lines.append(json.dumps(obj, ensure_ascii=False))
        new_chunks.write_text("\n".join(lines), encoding="utf-8")
        old_chunks.unlink()
        print(f"  chunks:   {old} -> {new}")

# Rebuild FTS5 with new slugs
import sqlite3
db_path = KNOWLEDGE_ROOT / "sqlite" / "knowledge.db"
db_path.unlink()
conn = sqlite3.connect(str(db_path))
cur = conn.cursor()
cur.execute(
    "CREATE VIRTUAL TABLE chunks USING fts5("
    "id UNINDEXED, doc_slug UNINDEXED, ordinal UNINDEXED, text, "
    "tokenize = 'unicode61 remove_diacritics 2');"
)
for new_slug in RENAMES.values():
    chunks_file = KNOWLEDGE_ROOT / "chunks" / f"{new_slug}.jsonl"
    if not chunks_file.exists():
        continue
    for line in chunks_file.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        obj = json.loads(line)
        cur.execute(
            "INSERT INTO chunks (id, doc_slug, ordinal, text) VALUES (?, ?, ?, ?)",
            (obj["id"], obj["doc_slug"], obj["ordinal"], obj["text"]),
        )
conn.commit()
conn.close()
print(f"  FTS5 rebuilt: {db_path}")

# Update master index
index_path = KNOWLEDGE_ROOT / "index.json"
index = json.loads(index_path.read_text(encoding="utf-8"))
for doc in index["documents"]:
    old_slug = doc["slug"]
    if old_slug in RENAMES:
        new_slug = RENAMES[old_slug]
        doc["slug"] = new_slug
        doc["metadata"] = f"metadata/{new_slug}.json"
        doc["chunks"] = f"chunks/{new_slug}.jsonl"
index_path.write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"  index.json updated")
print("\nDone.")
