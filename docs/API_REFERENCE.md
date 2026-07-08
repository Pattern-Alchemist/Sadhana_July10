# API Reference

All API routes live under `src/app/api/` and follow Next.js 16 App Router conventions. Every route is marked `export const dynamic = "force-dynamic"`.

## `POST /api/archivist`

The Custodian search endpoint. Searches across all siddhis and manuscripts using a weighted multi-field ranking algorithm.

### Request

```http
POST /api/archivist
Content-Type: application/json

{
  "query": "significance of Om"
}
```

The `query` field is required. It is lowercased, trimmed, and split on whitespace and punctuation into terms of length > 2.

### Response (200)

```json
{
  "results": [
    {
      "slug": "pranava-japa",
      "name": "Pranava Japa",
      "sanskrit": "प्रणव जप — Oṃkāra Repetition",
      "category": "Mantra",
      "summary": "The contemplative repetition of Oṃ...",
      "type": "siddhi",
      "reason": "Attested in the name.",
      "score": 76
    }
  ],
  "note": "The Custodian has traced 3 relevant records across 32 folios and 11 codices. These are scholarly pointers, not prescriptions — consult each source."
}
```

### Ranking Algorithm

For each siddhi, the algorithm iterates these fields with these weights:

| Field            | Weight |
|------------------|--------|
| `name`           | 6      |
| `primary_mantra` | 5      |
| `category`       | 4      |
| `tradition`      | 4      |
| `sanskrit`       | 3      |
| `summary`        | 3      |
| `description`    | 2      |

For each field, the count of distinct query terms that appear as substrings in the lowercased field value is multiplied by the field's weight and summed into a total score. The final displayed score is `min(99, 40 + score * 6)` for siddhis and `min(99, 38 + score * 6)` for manuscripts. The top 6 candidates by score are returned.

### Errors

- `200` with empty `results` and a "could not trace that thread" note when no candidate scores above 0.
- `500` with `{ results: [], note: "The Custodian is momentarily unavailable." }` on any thrown exception (logged to stderr as `[archivist]`).

## `GET /api/health`

Liveness probe. Verifies the database connection.

### Response (200)

```json
{
  "status": "ok",
  "timestamp": "2026-07-06T12:00:00.000Z",
  "database": "connected"
}
```

### Response (500)

```json
{
  "status": "degraded",
  "timestamp": "2026-07-06T12:00:00.000Z",
  "database": "unreachable",
  "error": "<message>"
}
```

## `GET /api/reflections`

Lists reflections, most recent first. Optionally filtered by `siddhi_slug` via query string.

### Query Parameters

| Name          | Type   | Required | Notes                          |
|---------------|--------|----------|--------------------------------|
| `siddhi_slug` | string | no       | Filter to one siddhi           |
| `limit`       | number | no       | Default 50, max 200            |

### Response (200)

```json
{
  "reflections": [
    {
      "id": 1,
      "penName": "Wanderer",
      "siddhiSlug": "pranava-japa",
      "title": "On the silence after the syllable",
      "body": "...",
      "tone": "practitioner",
      "createdAt": "2026-07-06T12:00:00.000Z"
    }
  ]
}
```

## `POST /api/reflections`

Creates a new reflection. Unauthenticated; pen-name only.

### Request

```http
POST /api/reflections
Content-Type: application/json

{
  "penName": "Wanderer",
  "siddhiSlug": "pranava-japa",
  "title": "On the silence after the syllable",
  "body": "...",
  "tone": "practitioner"
}
```

### Response (201)

```json
{
  "reflection": {
    "id": 42,
    "penName": "Wanderer",
    "siddhiSlug": "pranava-japa",
    "title": "On the silence after the syllable",
    "body": "...",
    "tone": "practitioner",
    "createdAt": "2026-07-06T12:00:00.000Z"
  }
}
```

## Rate Limiting

None implemented. For production, add IP-based rate limiting at the edge (Vercel, Cloudflare) or middleware-level. The `reflections` POST endpoint is the natural abuse vector.

## Authentication

None. All endpoints are public. Future auth is documented in `docs/ROADMAP.md`.
