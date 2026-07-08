# Knowledge Archive

The `knowledge/` directory is a self-contained offline retrieval archive built from six source documents (four Tantra PDFs plus two markdown transcriptions supplied via chat). It is separate from the runtime PostgreSQL database — the Next.js application does not currently read from it at request time. It exists to support future RAG retrieval and to give AI agents working on this project direct access to the primary-source material.

## Directory Structure

```
knowledge/
├── tantra/                       # 6 source documents (4 PDFs + 2 markdown)
│   ├── Agni Māraṇa Tantra.pdf                          (caution: high)
│   ├── Nimbu_Mantra_Siddhi_Sadhana_Manual.pdf          (caution: moderate)
│   ├── SADHANAs and KRIYAs - All.pdf                   (caution: moderate)
│   ├── Vīrudha-Āhāra Māraṇa – The Energetic Food Poison Curse.pdf  (caution: high)
│   ├── 5-rare-breath-magic-techniques.md               (caution: moderate)
│   └── preta-siddhi-field-manual.md                    (caution: high)
├── metadata/                     # Per-document JSON metadata
│   ├── agni-marana-tantra.json
│   ├── nimbu-mantra-siddhi-sadhana-manual.json
│   ├── sadhanas-and-kriyas-collected.json
│   ├── virudha-hara-marana-the-energetic-food-poison-curse.json
│   ├── 5-rare-breath-magic-techniques.json
│   └── preta-siddhi-field-manual.json
├── chunks/                       # Text chunks for retrieval (JSONL)
│   └── …one .jsonl per document…
├── sqlite/
│   └── knowledge.db              # FTS5 full-text index over all chunks (133 chunks)
└── index.json                    # Master index with document-level metadata
```

## Document Metadata Schema

Each file in `metadata/` follows this shape:

```json
{
  "slug": "agni-marana-tantra",
  "file": "Agni Māraṇa Tantra.pdf",
  "title": "Agni Māraṇa Tantra",
  "original_title": "अग्नि मारण तन्त्र",
  "category": "Tantra",
  "subcategory": "Māraṇa (Astral Cessation Rites)",
  "tradition": "Tantra / Śākta-Śaiva",
  "language": "Sanskrit + English commentary",
  "century": "Pre-modern (oral + manuscript compilation)",
  "tags": ["agni", "maraṇa", "tantra", "fire-rite", "śākta", "astral"],
  "description": "...",
  "caution_level": "high",
  "source": "User-supplied archive",
  "text_chars": 142857,
  "text_words": 18432,
  "pdf_bytes": 4033044
}
```

The `caution_level` field is the most operationally important: it is `low`, `moderate`, or `high`, and any retrieval pipeline that surfaces knowledge archive content to end users should filter on it. The two māraṇa texts are tagged `high`; the sādhana compendium and the Nimbu manual are `moderate`.

## Chunk Schema

Each line in `chunks/*.jsonl` is:

```json
{
  "id": "agni-marana-tantra#0042",
  "doc_slug": "agni-marana-tantra",
  "ordinal": 42,
  "text": "...the chunk text...",
  "char_count": 1187,
  "sha256": "a1b2c3d4e5f6a7b8"
}
```

Chunks are approximately 1200 characters with 150 characters of overlap between consecutive chunks. The overlap ensures that retrieval hits near a chunk boundary return enough context. The chunking is paragraph-aware: the algorithm prefers to break at paragraph boundaries and only hard-splits paragraphs longer than the chunk size.

## FTS5 Index

`sqlite/knowledge.db` contains a single virtual table:

```sql
CREATE VIRTUAL TABLE chunks USING fts5(
    id UNINDEXED,
    doc_slug UNINDEXED,
    ordinal UNINDEXED,
    text,
    tokenize = 'unicode61 remove_diacritics 2'
);
```

The `unicode61 remove_diacritics 2` tokenizer folds IAST diacritics, so a search for "Om" matches "Oṃ" and a search for "Siva" matches "Śiva". The `id`, `doc_slug`, and `ordinal` columns are `UNINDEXED` — they are stored but not tokenised, so they can be returned in query results without polluting the index.

### Querying the FTS5 Index

```python
import sqlite3
conn = sqlite3.connect("knowledge/sqlite/knowledge.db")
cur = conn.execute(
    "SELECT id, doc_slug, ordinal, text FROM chunks WHERE chunks MATCH ? "
    "ORDER BY rank LIMIT 5",
    ("pranava OR om",)
)
for row in cur:
    print(row)
```

The `MATCH` operator supports boolean (`AND`, `OR`, `NOT`), prefix (`pra*`), and phrase (`"pranava japa"`) queries. See the SQLite FTS5 documentation for the full query syntax.

## Master Index

`knowledge/index.json` aggregates document-level metadata across the archive:

```json
{
  "archive": "AstroKalki Knowledge Archive",
  "version": "1.0.0",
  "generated_at": "2026-07-06",
  "total_documents": 4,
  "total_chunks": 101,
  "total_chars": 234567,
  "total_words": 28765,
  "categories": ["Tantra"],
  "traditions": ["Tantra / Folk practice", "Tantra / Śākta-Śaiva", ...],
  "caution_levels": ["high", "moderate"],
  "documents": [ ... per-doc summary objects ... ]
}
```

## Build Script

The archive is built by `scripts/build_knowledge_archive.py`. It iterates the `DOCS` registry (hard-coded document metadata), extracts text from each PDF using `pdfplumber` with `pypdf` and `pdfminer` as fallbacks, chunks the text, writes the per-doc JSONL and metadata files, builds the FTS5 index, and writes the master index.

To rebuild the archive after adding or modifying PDFs:

1. Drop new PDFs into `knowledge/tantra/`.
2. Add a new entry to the `DOCS` list in `scripts/build_knowledge_archive.py` with the new file's metadata.
3. Run `python3 scripts/build_knowledge_archive.py`.

The script is idempotent — it overwrites the chunks, metadata, FTS5 index, and master index on every run.

## Integration with the Runtime Application

The knowledge archive is *not* currently wired into the Next.js runtime. The Custodian API (`/api/archivist`) searches only the `siddhis` and `manuscripts` tables in PostgreSQL. The natural integration path is a new `/api/knowledge/search` endpoint that runs FTS5 `MATCH` queries against `knowledge.db` and returns ranked chunks. This is documented as future work in `docs/ROADMAP.md`.

## Caution and Provenance

The six documents in this archive were supplied by the project owner and are preserved here as heritage source material. Three of them (`Agni Māraṇa Tantra`, `Vīrudha-Āhāra Māraṇa`, and `Preta-Siddhi — Field Manual`) describe adversarial or spirit-contact rites and are tagged `caution_level: high`. The remaining three (`Nimbu Mantra Siddhi Sādhana Manual`, `Sādhanās and Kriyās Collected`, and `5 Rare Breath Magic Techniques`) are tagged `moderate`. All are included for scholarly preservation; the project does not endorse their practice and does not surface them through the main browsing UI. Any future retrieval pipeline that surfaces knowledge archive content must respect the `caution_level` field and present appropriate framing.
