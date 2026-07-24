# CI Templates

This directory holds GitHub Actions workflow definitions that could not be pushed
directly to `.github/workflows/` from this session — the automation token used by
the agent does not have the `workflows` permission GitHub requires to create or
modify files under `.github/workflows/`.

## To activate

1. Copy the file into place:
   ```bash
   mkdir -p .github/workflows
   cp ci-templates/github-actions-ci.yml .github/workflows/ci.yml
   git add .github/workflows/ci.yml
   git commit -m "Enable CI workflow"
   git push
   ```
2. Push from a local machine or an account/token with `workflows` scope (the
   default `GITHUB_TOKEN` in Actions doesn't need this — only the *initial*
   commit that adds/edits a workflow file does, if pushed via API/App token
   without that scope).

## What it does

`github-actions-ci.yml` runs on every push/PR to `main`:
- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## Also in this directory

`embeddings-docs-dispatch.yml` (Sprint 7) — a **manual-dispatch** workflow for the
Moonshot 4.1 build-time jobs: regenerating pgvector corpus embeddings
(`scripts/generate_embeddings.py`) and optionally derived corpus docs
(`scripts/generate_docs.py`). No schedule is attached on purpose — a full corpus
embedding pass costs ~$0.0005 and is only needed when corpus content changes.

Activate it the same way:

```bash
cp ci-templates/embeddings-docs-dispatch.yml .github/workflows/corpus-jobs.yml
git add .github/workflows/corpus-jobs.yml
git commit -m "Enable manual corpus jobs workflow"
git push
```

Required secrets: `DATABASE_URL` (both jobs) and `OPENAI_API_KEY` (embeddings).
Trigger from Actions → "Corpus Embeddings & Docs (Manual)" → Run workflow.

See `docs/PROJECT_MAXIMIZER_REPORT.md` § 3.7 for the rationale (no CI existed
before this pass, and two real regressions — a broken service worker and a
broken test config — had already silently shipped to `main` without it).
