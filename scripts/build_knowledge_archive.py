#!/usr/bin/env python3
"""
AstroKalki — Knowledge Archive Builder (v3)
============================================
Extracts text from PDFs (.pdf) and Markdown (.md) source files. For .md files,
parses YAML-like frontmatter to override registry defaults.

Output: /home/z/my-project/workspace/Arena_Export/knowledge/

v3 changes:
  - Parses YAML frontmatter from .md files
  - Auto-registers any .md file in knowledge/tantra/ that has frontmatter
  - Falls back to a built-in DOCS registry entry for files without frontmatter
"""

import json
import os
import re
import sqlite3
import hashlib
from pathlib import Path
from typing import List, Dict, Any, Optional

# ---------- IAST → ASCII fold ----------

IAST_FOLD = {
    "ā": "a", "á": "a", "à": "a", "â": "a", "ǎ": "a",
    "ī": "i", "í": "i", "ì": "i", "î": "i",
    "ū": "u", "ú": "u", "ù": "u", "û": "u",
    "ṛ": "r", "ṝ": "r", "ṙ": "r",
    "ṅ": "n", "ñ": "n", "ṇ": "n",
    "ṭ": "t", "ḍ": "d",
    "ś": "s", "ṣ": "s",
    "ḥ": "h", "ṃ": "m", "ṁ": "m",
    "ē": "e", "ḗ": "e",
    "ō": "o", "ṓ": "o",
    "—": "-", "–": "-",
    "’": "", "‘": "",
    "“": '"', "”": '"',
}


def fold_diacritics(s: str) -> str:
    return "".join(IAST_FOLD.get(c, c) for c in s)


def slugify(name: str) -> str:
    s = fold_diacritics(name).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


# ---------- Frontmatter parser ----------

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def parse_frontmatter(text: str) -> tuple[Dict[str, Any], str]:
    """Parse a simple YAML-like frontmatter block. Returns (meta, body)."""
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text
    raw = m.group(1)
    body = text[m.end():]
    meta: Dict[str, Any] = {}
    for line in raw.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip()
        # Strip quotes
        if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
            val = val[1:-1]
        # Parse list
        if val.startswith("[") and val.endswith("]"):
            inner = val[1:-1]
            items = [x.strip().strip('"').strip("'") for x in inner.split(",") if x.strip()]
            meta[key] = items
        else:
            meta[key] = val
    return meta, body


# ---------- PDF text extraction ----------

def extract_pdf_text(pdf_path: Path) -> str:
    try:
        import pdfplumber
        text_parts = []
        with pdfplumber.open(str(pdf_path)) as pdf:
            for page in pdf.pages:
                text_parts.append(page.extract_text() or "")
        joined = "\n\n".join(text_parts).strip()
        if len(joined) > 100:
            return joined
    except Exception:
        pass
    try:
        from pypdf import PdfReader
        reader = PdfReader(str(pdf_path))
        joined = "\n\n".join((p.extract_text() or "") for p in reader.pages).strip()
        if len(joined) > 100:
            return joined
    except Exception:
        pass
    try:
        from pdfminer.high_level import extract_text
        txt = extract_text(str(pdf_path)) or ""
        if txt.strip():
            return txt.strip()
    except Exception:
        pass
    return ""


def extract_md_text(md_path: Path) -> tuple[Dict[str, Any], str]:
    """Returns (frontmatter, body_text)."""
    raw = md_path.read_text(encoding="utf-8")
    meta, body = parse_frontmatter(raw)
    return meta, body


# ---------- Built-in registry for PDFs and any .md files without frontmatter ----------

BUILTIN_DOCS = [
    {
        "kind": "pdf",
        "file": "Agni Māraṇa Tantra.pdf",
        "title": "Agni Māraṇa Tantra",
        "original_title": "अग्नि मारण तन्त्र",
        "category": "Tantra",
        "subcategory": "Māraṇa (Astral Cessation Rites)",
        "tradition": "Tantra / Śākta-Śaiva",
        "language": "Sanskrit + English commentary",
        "century": "Pre-modern (oral + manuscript compilation)",
        "tags": ["agni", "maraṇa", "tantra", "fire-rite", "śākta", "astral"],
        "description": (
            "A Tantra-text compilation centered on the Agni Māraṇa rite, the "
            "use of consecrated fire as the agent of an energetic cessation "
            "ritual. The text documents mantra, yantra, and procedural detail "
            "alongside cautionary framing. Preserved here as heritage and "
            "source material, not as practical instruction."
        ),
        "caution_level": "high",
        "source": "User-supplied archive",
    },
    {
        "kind": "pdf",
        "file": "Nimbu_Mantra_Siddhi_Sadhana_Manual.pdf",
        "title": "Nimbu Mantra Siddhi Sādhana Manual",
        "original_title": "निम्बु मन्त्र सिद्धि साधना",
        "category": "Tantra",
        "subcategory": "Mantra Siddhi (Practical Sādhana)",
        "tradition": "Tantra / Folk practice",
        "language": "English + Hindi",
        "century": "Modern compilation (20th to 21st century)",
        "tags": ["nimbu", "lemon", "mantra-siddhi", "sādhana", "folk-tantra"],
        "description": (
            "A short operational manual on the Nimbu (lemon) mantra-siddhi "
            "sādhana, a folk-tantric purification rite using a lemon as the "
            "ritual substrate. Documented heritage; outcomes are not guaranteed."
        ),
        "caution_level": "moderate",
        "source": "User-supplied archive",
    },
    {
        "kind": "pdf",
        "file": "SADHANAs and KRIYAs - All.pdf",
        "title": "Sādhanās and Kriyās Collected",
        "original_title": "साधना एवं क्रिया संग्रह",
        "category": "Tantra",
        "subcategory": "Sādhana Compendium",
        "tradition": "Tantra / Yoga / Bhakti syncretic",
        "language": "English + Sanskrit",
        "century": "Modern compilation",
        "tags": ["sādhana", "kriyā", "compendium", "practice", "yoga", "tantra"],
        "description": (
            "A compendium of multiple sādhanās and kriyās drawn from tantric, "
            "yogic, and devotional sources. Includes foundation practices "
            "such as pranava-japa and nāḍī śuddhi as well as specialised kriyās."
        ),
        "caution_level": "moderate",
        "source": "User-supplied archive",
    },
    {
        "kind": "pdf",
        "file": "Vīrudha-Āhāra Māraṇa – The Energetic Food Poison Curse.pdf",
        "title": "Vīrudha-Āhāra Māraṇa — The Energetic Food Poison Curse",
        "original_title": "विरुध आहार मारण",
        "category": "Tantra",
        "subcategory": "Māraṇa (Abhicāra)",
        "tradition": "Tantra / Śākta-Śaiva (Abhicārika)",
        "language": "English commentary + Sanskrit",
        "century": "Pre-modern",
        "tags": ["vīrudha", "āhāra", "māraṇa", "abhicāra", "curse", "food-rite"],
        "description": (
            "A specialised māraṇa text detailing the Vīrudha-Āhāra rite, an "
            "adversarial tantric procedure framed around energetic "
            "contamination of food. Included for scholarly and source-text "
            "preservation only. Not instructional; explicit caution flag set."
        ),
        "caution_level": "high",
        "source": "User-supplied archive",
    },
    {
        "kind": "md",
        "file": "5-rare-breath-magic-techniques.md",
        "title": "5 Rare Breath Magic Techniques",
        "original_title": "पञ्च दुर्लभ प्राण-विद्या",
        "category": "Yoga",
        "subcategory": "Prāṇāyāma (Breath Techniques)",
        "tradition": "Yoga / Tantric syncretic",
        "language": "English",
        "century": "Modern compilation",
        "tags": ["breath", "pranayama", "kumbhaka", "whisper-breath", "spine-flame", "shaman-triangle", "quantum-pause"],
        "description": (
            "A short operational manual of five lesser-known breath techniques: "
            "Kumbhaka of Silence, Whisper Breath, Spine Flame Breath, the "
            "Shaman's Triangle, and the Quantum Pause. Drawn from prāṇāyāma, "
            "tantric, and syncretic contemplative sources."
        ),
        "caution_level": "moderate",
        "source": "User-supplied chat transcript",
    },
    {
        "kind": "md",
        "file": "preta-siddhi-field-manual.md",
        "title": "Preta-Siddhi — Field Manual",
        "original_title": "प्रेत सिद्धि",
        "category": "Tantra",
        "subcategory": "Preta-Saṁvāda (Spirit Communication)",
        "tradition": "Tantra / Aghora / Kaula",
        "language": "English + Sanskrit + Hindi",
        "century": "Pre-modern (oral transmission) / Modern compilation",
        "tags": ["preta", "spirit-communication", "aghora", "kaula", "yantra", "mantra", "mukti", "bandhana-chedana"],
        "description": (
            "A complete field manual for preta-saṁvāda (spirit communication) "
            "drawn from Aghora and Kaula tantric sources. Includes preparatory "
            "bhūta-śuddhi rites, the Preta-Sandhi Yantra with geometric "
            "proportions, the Chakra-Maṇḍala layout, the seven diagnostic "
            "Prashna sequence, and the Preta-Mukti Kriyā liberation rite. "
            "Preserved as scholarly source material only."
        ),
        "caution_level": "high",
        "source": "User-supplied chat transcript",
    },
    # ----- New PDFs (batch 4) -----
    {
        "kind": "pdf",
        "file": "TANTRA VIDYA  🔱.pdf",
        "title": "Tantra Vidya",
        "original_title": "तन्त्र विद्या",
        "category": "Tantra",
        "subcategory": "General Tantra Compendium",
        "tradition": "Tantra / Śākta-Śaiva",
        "language": "English + Sanskrit",
        "century": "Modern compilation",
        "tags": ["tantra", "vidya", "compendium", "mantra", "yantra", "ritual"],
        "description": (
            "A comprehensive compendium on Tantra Vidya — the knowledge system "
            "of tantric practice. Covers mantra, yantra, ritual procedure, "
            "deity worship, and the broader tantric framework. Preserved as "
            "heritage / source material."
        ),
        "caution_level": "moderate",
        "source": "User-supplied archive",
    },
    {
        "kind": "pdf",
        "file": "Mantra-Tantra.pdf",
        "title": "Mantra-Tantra",
        "original_title": "मन्त्र तन्त्र",
        "category": "Tantra",
        "subcategory": "Mantra Śāstra",
        "tradition": "Tantra / Mantra Śāstra",
        "language": "English + Sanskrit",
        "century": "Modern compilation",
        "tags": ["mantra", "tantra", "mantra-sastra", "japa", "bija", "sound"],
        "description": (
            "A text on Mantra-Tantra — the science of sacred sound within the "
            "tantric framework. Covers the theory and practice of mantra, "
            "including bīja-syllables, japa methodology, and the relationship "
            "between sound and consciousness."
        ),
        "caution_level": "moderate",
        "source": "User-supplied archive",
    },
    {
        "kind": "pdf",
        "file": "Stambhana Māraṇa – The Freezing Death Ritual.pdf",
        "title": "Stambhana Māraṇa — The Freezing Death Ritual",
        "original_title": "स्तम्भन मारण",
        "category": "Tantra",
        "subcategory": "Stambhana-Māraṇa (Combined Freeze-Death Rite)",
        "tradition": "Tantra / Śākta (Abhicārika)",
        "language": "English + Sanskrit",
        "century": "Pre-modern / Modern compilation",
        "tags": ["stambhana", "marana", "freezing", "death-rite", "abhicara", "sat-karma"],
        "description": (
            "A specialized text detailing the Stambhana Māraṇa rite — a combined "
            "immobilization-and-transformation ritual that merges two of the six "
            "ṣaṭ-karma (stambhana and māraṇa) into a single operational procedure. "
            "HIGH CAUTION — preserved for scholarly study only. Not instructional."
        ),
        "caution_level": "high",
        "source": "User-supplied archive",
    },
]


# ---------- Auto-discover .md files with frontmatter ----------

def discover_md_docs(tantra_dir: Path) -> List[Dict[str, Any]]:
    """Find all .md files in tantra/ with frontmatter, build registry entries."""
    discovered = []
    builtin_files = {d["file"] for d in BUILTIN_DOCS if d["kind"] == "md"}
    for md_path in sorted(tantra_dir.glob("*.md")):
        if md_path.name in builtin_files:
            continue
        meta, body = extract_md_text(md_path)
        if not meta:
            continue
        description = ""
        # Pull the first > quote in the body as description
        m = re.search(r"^>\s*(.+?)(?=\n\n|\n##|\Z)", body, re.MULTILINE | re.DOTALL)
        if m:
            description = m.group(1).strip()[:400]
        entry = {
            "kind": "md",
            "file": md_path.name,
            "title": meta.get("title", md_path.stem),
            "original_title": meta.get("original_title", ""),
            "category": meta.get("category", "Tantra"),
            "subcategory": meta.get("subcategory", ""),
            "tradition": meta.get("tradition", ""),
            "language": meta.get("language", ""),
            "century": meta.get("century", ""),
            "tags": meta.get("tags", []),
            "description": description,
            "caution_level": meta.get("caution_level", "moderate"),
            "source": meta.get("source", "Web-researched, scholarly attested"),
        }
        discovered.append(entry)
    return discovered


# ---------- Paths ----------

KNOWLEDGE_ROOT = Path("/home/z/my-project/workspace/Arena_Export/knowledge")
PDF_DIR = KNOWLEDGE_ROOT / "tantra"
META_DIR = KNOWLEDGE_ROOT / "metadata"
CHUNKS_DIR = KNOWLEDGE_ROOT / "chunks"
SQLITE_DIR = KNOWLEDGE_ROOT / "sqlite"

for d in (META_DIR, CHUNKS_DIR, SQLITE_DIR):
    d.mkdir(parents=True, exist_ok=True)


# ---------- Chunking ----------

def chunk_text(text: str, doc_slug: str, chunk_size: int = 1200, overlap: int = 150) -> List[Dict[str, Any]]:
    if not text:
        return []
    text = re.sub(r"[ \t]+", " ", text)
    paragraphs = [p.strip() for p in re.split(r"\n{2,}", text) if p.strip()]

    chunks: List[Dict[str, Any]] = []
    buf = ""
    idx = 0
    for para in paragraphs:
        candidate = (buf + "\n\n" + para).strip() if buf else para
        if len(candidate) <= chunk_size:
            buf = candidate
            continue
        if buf:
            chunks.append(_mk_chunk(buf, doc_slug, idx))
            idx += 1
            buf = buf[-overlap:] + "\n\n" + para if len(buf) > overlap else para
        else:
            for i in range(0, len(para), chunk_size - overlap):
                chunks.append(_mk_chunk(para[i:i + chunk_size], doc_slug, idx))
                idx += 1
            buf = ""
    if buf:
        chunks.append(_mk_chunk(buf, doc_slug, idx))
    return chunks


def _mk_chunk(text: str, doc_slug: str, idx: int) -> Dict[str, Any]:
    return {
        "id": f"{doc_slug}#{idx:04d}",
        "doc_slug": doc_slug,
        "ordinal": idx,
        "text": text,
        "char_count": len(text),
        "sha256": hashlib.sha256(text.encode("utf-8")).hexdigest()[:16],
    }


def build_fts5(all_chunks: List[Dict[str, Any]]):
    db_path = SQLITE_DIR / "knowledge.db"
    if db_path.exists():
        db_path.unlink()
    conn = sqlite3.connect(str(db_path))
    cur = conn.cursor()
    cur.execute(
        "CREATE VIRTUAL TABLE chunks USING fts5("
        "id UNINDEXED, doc_slug UNINDEXED, ordinal UNINDEXED, text, "
        "tokenize = 'unicode61 remove_diacritics 2');"
    )
    for c in all_chunks:
        cur.execute(
            "INSERT INTO chunks (id, doc_slug, ordinal, text) VALUES (?, ?, ?, ?)",
            (c["id"], c["doc_slug"], c["ordinal"], c["text"]),
        )
    conn.commit()
    conn.close()
    return db_path


# ---------- Main ----------

def main():
    print("Building knowledge archive (v3)...")
    docs = list(BUILTIN_DOCS) + discover_md_docs(PDF_DIR)
    print(f"  registry: {len(docs)} documents "
          f"({sum(1 for d in docs if d['kind']=='pdf')} PDF, "
          f"{sum(1 for d in docs if d['kind']=='md')} MD)")

    # Prune stale metadata / chunks
    existing_slugs = {slugify(d["title"]) for d in docs}
    for d in (META_DIR, CHUNKS_DIR):
        for f in d.iterdir():
            if f.is_file() and f.stem not in existing_slugs:
                f.unlink()
                print(f"  pruned stale: {d.name}/{f.name}")

    index_entries = []
    all_chunks = []

    for doc in docs:
        src_path = PDF_DIR / doc["file"]
        if not src_path.exists():
            print(f"  Missing: {src_path}")
            continue

        slug = slugify(doc["title"])
        print(f"  Processing: {doc['title']}  (kind={doc['kind']}, slug={slug})")

        if doc["kind"] == "pdf":
            text = extract_pdf_text(src_path)
        else:
            _, text = extract_md_text(src_path)

        text_chars = len(text)
        text_words = len(text.split())

        meta = {
            "slug": slug,
            "kind": doc["kind"],
            "file": doc["file"],
            "title": doc["title"],
            "original_title": doc.get("original_title", ""),
            "category": doc["category"],
            "subcategory": doc.get("subcategory", ""),
            "tradition": doc["tradition"],
            "language": doc.get("language", ""),
            "century": doc.get("century", ""),
            "tags": doc["tags"],
            "description": doc["description"],
            "caution_level": doc["caution_level"],
            "source": doc.get("source", ""),
            "text_chars": text_chars,
            "text_words": text_words,
            "source_bytes": src_path.stat().st_size,
        }
        (META_DIR / f"{slug}.json").write_text(
            json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8"
        )

        chunks = chunk_text(text, slug)
        (CHUNKS_DIR / f"{slug}.jsonl").write_text(
            "\n".join(json.dumps(c, ensure_ascii=False) for c in chunks),
            encoding="utf-8",
        )
        all_chunks.extend(chunks)

        index_entries.append({
            "slug": slug,
            "kind": doc["kind"],
            "title": doc["title"],
            "original_title": doc.get("original_title", ""),
            "category": doc["category"],
            "subcategory": doc.get("subcategory", ""),
            "tradition": doc["tradition"],
            "tags": doc["tags"],
            "caution_level": doc["caution_level"],
            "file": f"tantra/{doc['file']}",
            "metadata": f"metadata/{slug}.json",
            "chunks": f"chunks/{slug}.jsonl",
            "text_chars": text_chars,
            "text_words": text_words,
            "chunk_count": len(chunks),
            "description": doc["description"],
        })

    master = {
        "archive": "AstroKalki Knowledge Archive",
        "version": "3.0.0",
        "generated_at": "2026-07-06",
        "total_documents": len(index_entries),
        "total_chunks": len(all_chunks),
        "total_chars": sum(e["text_chars"] for e in index_entries),
        "total_words": sum(e["text_words"] for e in index_entries),
        "categories": sorted({e["category"] for e in index_entries}),
        "traditions": sorted({e["tradition"] for e in index_entries}),
        "caution_levels": sorted({e["caution_level"] for e in index_entries}),
        "caution_summary": {
            "high": sum(1 for e in index_entries if e["caution_level"] == "high"),
            "moderate": sum(1 for e in index_entries if e["caution_level"] == "moderate"),
            "low": sum(1 for e in index_entries if e["caution_level"] == "low"),
        },
        "documents": index_entries,
    }
    (KNOWLEDGE_ROOT / "index.json").write_text(
        json.dumps(master, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    fts_path = build_fts5(all_chunks)
    print(f"  FTS5 index: {fts_path}  ({len(all_chunks)} chunks)")
    print(f"\nKnowledge archive built: {len(index_entries)} docs, {len(all_chunks)} chunks")
    print(f"  high-caution: {master['caution_summary']['high']}, moderate: {master['caution_summary']['moderate']}, low: {master['caution_summary']['low']}")
    print(f"  by category: {', '.join(master['categories'])}")


if __name__ == "__main__":
    main()
