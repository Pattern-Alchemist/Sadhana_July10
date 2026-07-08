#!/usr/bin/env python3
"""
AstroKalki — Siddhi Corpus Export
=================================
Parses src/lib/archive-data.ts (a TypeScript file with structured seed data)
and produces three export files:

  1. download/astrokalki_siddhis.csv      — one row per siddhi
  2. download/astrokalki_siddhis.json     — full structured export (siddhis + evidence)
  3. download/astrokalki_siddhis.md       — human-readable catalogue

The parser is intentionally a simple regex/bracket-matching extractor — it does
not execute the TypeScript. It handles the schema fields used in archive-data.ts.
"""

import csv
import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

ARCHIVE_FILE = Path("/home/z/my-project/workspace/Arena_Export/src/lib/archive-data.ts")
OUT_DIR = Path("/home/z/my-project/download")
OUT_DIR.mkdir(parents=True, exist_ok=True)


# ---------- Parser ----------

def find_array_body(text: str, name: str) -> str:
    """Find `export const NAME = [ ... ];` and return the body between [ and ]."""
    pat = re.compile(rf"export\s+const\s+{re.escape(name)}\s*(?::[^=]+)?=\s*\[", re.MULTILINE)
    m = pat.search(text)
    if not m:
        raise ValueError(f"Array {name} not found")
    start = m.end()
    # bracket match from start
    depth = 1
    i = start
    in_str = None
    esc = False
    while i < len(text) and depth > 0:
        ch = text[i]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
        else:
            if ch in ('"', "'", "`"):
                in_str = ch
            elif ch == "[":
                depth += 1
            elif ch == "]":
                depth -= 1
                if depth == 0:
                    return text[start:i]
        i += 1
    raise ValueError(f"Unbalanced brackets in {name}")


def split_objects(body: str) -> List[str]:
    """Split the array body into top-level object strings (the { ... } blocks)."""
    objs = []
    depth = 0
    i = 0
    in_str = None
    esc = False
    start = None
    while i < len(body):
        ch = body[i]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
        else:
            if ch in ('"', "'", "`"):
                in_str = ch
            elif ch == "{":
                if depth == 0:
                    start = i
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0 and start is not None:
                    objs.append(body[start:i + 1])
                    start = None
        i += 1
    return objs


def parse_value(raw: str) -> Any:
    """Parse a JS/TS literal value (string, number, bool, array, object, null)."""
    raw = raw.strip()
    if raw.startswith("`") and raw.endswith("`"):
        # Template literal — strip ${} interpolations, keep the rest
        inner = raw[1:-1]
        inner = re.sub(r"\$\{[^}]*\}", "", inner)
        return inner
    if (raw.startswith('"') and raw.endswith('"')) or (raw.startswith("'") and raw.endswith("'")):
        return _unescape(raw[1:-1])
    if raw.lower() in ("true", "false"):
        return raw.lower() == "true"
    if raw.lower() in ("null", "undefined"):
        return None
    if raw.startswith("[") and raw.endswith("]"):
        inner = raw[1:-1].strip()
        if not inner:
            return []
        parts = _split_top_level(inner, ",")
        return [parse_value(p) for p in parts if p.strip()]
    if raw.startswith("{") and raw.endswith("}"):
        return parse_object(raw)
    # number
    try:
        if "." in raw:
            return float(raw)
        return int(raw)
    except ValueError:
        return raw


def _unescape(s: str) -> str:
    return s.encode().decode("unicode_escape") if "\\" in s else s


def _split_top_level(s: str, delim: str) -> List[str]:
    parts = []
    depth = 0
    in_str = None
    esc = False
    buf = []
    for ch in s:
        if in_str:
            buf.append(ch)
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
        else:
            if ch in ('"', "'", "`"):
                in_str = ch
                buf.append(ch)
            elif ch in "[{(":
                depth += 1
                buf.append(ch)
            elif ch in "]})":
                depth -= 1
                buf.append(ch)
            elif ch == delim and depth == 0:
                parts.append("".join(buf))
                buf = []
            else:
                buf.append(ch)
    if buf:
        parts.append("".join(buf))
    return parts


def parse_object(obj_str: str) -> Dict[str, Any]:
    """Parse a flat { k: v, k: v, ... } object (with possible nested objects/arrays)."""
    inner = obj_str.strip()
    if inner.startswith("{") and inner.endswith("}"):
        inner = inner[1:-1]
    pairs = _split_top_level(inner, ",")
    out: Dict[str, Any] = {}
    for p in pairs:
        p = p.strip()
        if not p or p.startswith("//"):
            continue
        # split on the first top-level colon
        # but skip colons inside strings / brackets
        depth = 0
        in_str = None
        esc = False
        colon_idx = -1
        for i, ch in enumerate(p):
            if in_str:
                if esc:
                    esc = False
                elif ch == "\\":
                    esc = True
                elif ch == in_str:
                    in_str = None
            else:
                if ch in ('"', "'", "`"):
                    in_str = ch
                elif ch in "[{(":
                    depth += 1
                elif ch in "]})":
                    depth -= 1
                elif ch == ":" and depth == 0:
                    colon_idx = i
                    break
        if colon_idx < 0:
            continue
        key = p[:colon_idx].strip()
        # strip quotes from key
        if (key.startswith('"') and key.endswith('"')) or (key.startswith("'") and key.endswith("'")):
            key = key[1:-1]
        val_raw = p[colon_idx + 1:].strip()
        out[key] = parse_value(val_raw)
    return out


def extract_siddhis(text: str) -> List[Dict[str, Any]]:
    body = find_array_body(text, "SIDDHI_SEED")
    objs = split_objects(body)
    out = []
    for o in objs:
        try:
            parsed = parse_object(o)
            if parsed:
                out.append(parsed)
        except Exception as e:
            print(f"  ! Failed to parse siddhi object: {e}", file=sys.stderr)
    return out


def extract_evidence(text: str) -> List[Dict[str, Any]]:
    body = find_array_body(text, "EVIDENCE_SEED")
    objs = split_objects(body)
    out = []
    for o in objs:
        try:
            parsed = parse_object(o)
            if parsed:
                out.append(parsed)
        except Exception as e:
            print(f"  ! Failed to parse evidence object: {e}", file=sys.stderr)
    return out


def extract_manuscripts(text: str) -> List[Dict[str, Any]]:
    body = find_array_body(text, "MANUSCRIPT_SEED")
    objs = split_objects(body)
    out = []
    for o in objs:
        try:
            parsed = parse_object(o)
            if parsed:
                out.append(parsed)
        except Exception:
            pass
    return out


# ---------- Exporters ----------

def to_csv(siddhis: List[Dict[str, Any]], evidence: List[Dict[str, Any]], out_path: Path):
    """One row per siddhi; flatten benefits/warnings to semicolon-joined strings."""
    fields = [
        "slug", "name", "sanskrit", "category", "tradition", "level",
        "duration_hours", "days", "authenticity_score",
        "summary", "primary_mantra", "lineage",
        "benefits", "warnings",
        "evidence_count", "evidence_sources",
    ]
    evidence_by_slug: Dict[str, List[Dict[str, Any]]] = {}
    for e in evidence:
        s = e.get("siddhiSlug") or e.get("siddhi_slug")
        if s:
            evidence_by_slug.setdefault(s, []).append(e)

    with out_path.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, quoting=csv.QUOTE_ALL)
        w.writerow(fields)
        for s in siddhis:
            slug = s.get("slug", "")
            ev_list = evidence_by_slug.get(slug, [])
            ev_str = " | ".join(
                f"[{e.get('confidence','?')}] {e.get('citation','')} ({e.get('kind','')})"
                + (f" — {e.get('url')}" if e.get("url") else "")
                for e in ev_list
            )
            w.writerow([
                slug,
                s.get("name", ""),
                s.get("sanskrit", ""),
                s.get("category", ""),
                s.get("tradition", ""),
                s.get("level", ""),
                s.get("durationHours", ""),
                s.get("days", ""),
                s.get("authenticityScore", ""),
                s.get("summary", ""),
                s.get("primaryMantra", ""),
                s.get("lineage", ""),
                " ; ".join(s.get("benefits", []) or []),
                " ; ".join(s.get("warnings", []) or []),
                len(ev_list),
                ev_str,
            ])
    print(f"  wrote {out_path.relative_to(OUT_DIR.parent)}  ({len(siddhis)} rows)")


def to_json(siddhis: List[Dict[str, Any]], evidence: List[Dict[str, Any]],
            manuscripts: List[Dict[str, Any]], out_path: Path):
    evidence_by_slug: Dict[str, List[Dict[str, Any]]] = {}
    for e in evidence:
        s = e.get("siddhiSlug") or e.get("siddhi_slug")
        if s:
            evidence_by_slug.setdefault(s, []).append(e)

    payload = {
        "archive": "AstroKalki Siddhi Corpus",
        "version": "1.3.0",
        "exported_at": "2026-07-06",
        "total_siddhis": len(siddhis),
        "total_evidence_sources": len(evidence),
        "total_manuscripts": len(manuscripts),
        "siddhis": [],
        "manuscripts": manuscripts,
    }
    for s in siddhis:
        slug = s.get("slug", "")
        s_copy = dict(s)
        s_copy["evidence_sources"] = evidence_by_slug.get(slug, [])
        payload["siddhis"].append(s_copy)

    out_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  wrote {out_path.relative_to(OUT_DIR.parent)}  "
          f"({len(siddhis)} siddhis, {len(evidence)} evidence, {len(manuscripts)} manuscripts)")


def to_markdown(siddhis: List[Dict[str, Any]], evidence: List[Dict[str, Any]],
                out_path: Path):
    evidence_by_slug: Dict[str, List[Dict[str, Any]]] = {}
    for e in evidence:
        s = e.get("siddhiSlug") or e.get("siddhi_slug")
        if s:
            evidence_by_slug.setdefault(s, []).append(e)

    # Group by category
    by_cat: Dict[str, List[Dict[str, Any]]] = {}
    for s in siddhis:
        by_cat.setdefault(s.get("category", "Uncategorised"), []).append(s)

    lines = [
        "# AstroKalki — Siddhi Catalogue",
        "",
        f"> Exported 2026-07-06 · {len(siddhis)} siddhis · {len(evidence)} evidence sources",
        "",
        "This catalogue lists every siddhi in the AstroKalki seed corpus, grouped by category.",
        "Each entry includes the textual attestation summary, the primary mantra, the warnings, "
        "and the list of evidence sources with their confidence ratings. The catalogue is "
        "preserved here for review and as a quick-reference index into the full archive.",
        "",
        "---",
        "",
        "## Summary Statistics",
        "",
        f"- **Total siddhis:** {len(siddhis)}",
        f"- **Total evidence sources:** {len(evidence)}",
        f"- **Categories:** {len(by_cat)}",
        "",
        "### By category",
        "",
    ]
    for cat in sorted(by_cat.keys()):
        lines.append(f"- **{cat}** — {len(by_cat[cat])} siddhi(s)")
    lines.append("")
    lines.append("### By caution level (inferred from warnings text)")
    high_count = sum(1 for s in siddhis if any("HIGH CAUTION" in (w or "") for w in (s.get("warnings") or [])))
    moderate_count = sum(1 for s in siddhis if any("MODERATE CAUTION" in (w or "") for w in (s.get("warnings") or [])))
    lines.append(f"- **High caution:** {high_count} siddhi(s)")
    lines.append(f"- **Moderate caution:** {moderate_count} siddhi(s)")
    lines.append("")
    lines.append("---")
    lines.append("")

    for cat in sorted(by_cat.keys()):
        lines.append(f"## {cat}")
        lines.append("")
        for s in sorted(by_cat[cat], key=lambda x: -(x.get("authenticityScore") or 0)):
            slug = s.get("slug", "")
            lines.append(f"### {s.get('name', slug)}")
            lines.append("")
            if s.get("sanskrit"):
                lines.append(f"> {s['sanskrit']}")
                lines.append("")
            meta_bits = []
            if s.get("tradition"):
                meta_bits.append(s["tradition"])
            if s.get("level"):
                meta_bits.append(s["level"])
            if s.get("authenticityScore"):
                meta_bits.append(f"authenticity: {s['authenticityScore']}/100")
            if s.get("days"):
                meta_bits.append(f"{s['days']} days")
            if meta_bits:
                lines.append(f"*{' · '.join(meta_bits)}*")
                lines.append("")
            if s.get("summary"):
                lines.append(s["summary"])
                lines.append("")
            if s.get("primaryMantra"):
                lines.append(f"**Primary mantra:** {s['primaryMantra']}")
                lines.append("")
            warnings = s.get("warnings") or []
            if warnings:
                lines.append("**Warnings:**")
                lines.append("")
                for w in warnings:
                    lines.append(f"- {w}")
                lines.append("")
            ev = evidence_by_slug.get(slug, [])
            if ev:
                lines.append(f"**Evidence sources ({len(ev)}):**")
                lines.append("")
                for e in ev:
                    conf = e.get("confidence", "?")
                    cit = e.get("citation", "")
                    kind = e.get("kind", "")
                    url = e.get("url", "")
                    line = f"- [{conf}] *{kind}* — {cit}"
                    if url:
                        line += f" ([source]({url}))"
                    if e.get("notes"):
                        line += f" — {e['notes']}"
                    lines.append(line)
                lines.append("")
            lines.append("---")
            lines.append("")

    out_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"  wrote {out_path.relative_to(OUT_DIR.parent)}  ({len(siddhis)} siddhis grouped by category)")


# ---------- Main ----------

def main():
    if not ARCHIVE_FILE.exists():
        print(f"ERROR: {ARCHIVE_FILE} not found", file=sys.stderr)
        sys.exit(1)
    text = ARCHIVE_FILE.read_text(encoding="utf-8")
    print(f"Parsing {ARCHIVE_FILE.name} ({len(text):,} chars)...")
    siddhis = extract_siddhis(text)
    evidence = extract_evidence(text)
    manuscripts = extract_manuscripts(text)
    print(f"  parsed: {len(siddhis)} siddhis, {len(evidence)} evidence sources, {len(manuscripts)} manuscripts")

    print(f"\nExporting to {OUT_DIR}:")
    to_csv(siddhis, evidence, OUT_DIR / "astrokalki_siddhis.csv")
    to_json(siddhis, evidence, manuscripts, OUT_DIR / "astrokalki_siddhis.json")
    to_markdown(siddhis, evidence, OUT_DIR / "astrokalki_siddhis.md")

    print("\nDone.")


if __name__ == "__main__":
    main()
