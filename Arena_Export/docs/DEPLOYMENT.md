# Deployment

AstroKalki is a standard Next.js 16 application with a single PostgreSQL database dependency. It deploys cleanly to any platform that supports Node.js 18+ and a managed Postgres instance.

## Prerequisites

- Node.js 18+ (20 LTS recommended)
- PostgreSQL 14+ (managed or self-hosted)
- `npm` or `pnpm` or `yarn`

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
DATABASE_URL=postgresql://user:password@host:5432/astrokalki
```

`DATABASE_URL` is the only required variable. The Drizzle client reads it directly via `pg`. No other environment variables are used by the application at runtime.

For production, also set:

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Local Development

```bash
npm install
cp .env.example .env
# edit .env with your DATABASE_URL
npx drizzle-kit push    # apply schema to the database
npm run dev             # http://localhost:3000
```

The `bootstrap.ts` self-healing DDL will run on the first request and seed the database. If `drizzle-kit push` is not run, the bootstrap will create the tables anyway (via `CREATE TABLE IF NOT EXISTS`), so a completely fresh database will work without explicit migration.

## Production Build

```bash
npm install --production=false
npm run build
npm start
```

`npm run build` produces `.next/` with the compiled application. `npm start` runs the production server on port 3000 by default (override with `PORT=xxxx`).

## Platform Deployments

### Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Set `DATABASE_URL` in the Vercel project's environment variables.
4. Deploy. Vercel runs `npm run build` and serves the output.

Vercel Postgres, Neon, Supabase, and RDS all work as database providers. Choose based on region and budget.

### Self-hosted (Docker)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

Run with a reverse proxy (Caddy, nginx) in front for TLS termination.

### Database Provisioning

For a fresh database, no manual schema work is required — `bootstrap.ts` will create tables and seed data on first request. For an existing database, the bootstrap is idempotent (`CREATE TABLE IF NOT EXISTS` + `INSERT ... ON CONFLICT DO NOTHING`) and will not disturb existing data.

To reset the database:

```sql
DROP TABLE IF EXISTS reflections, evidence_sources, schools, manuscripts, siddhis CASCADE;
```

Then make any request to the application; the bootstrap will recreate and reseed everything.

## Health Checking

`GET /api/health` returns 200 with `{ status: "ok", database: "connected" }` when the application and database are healthy, and 500 with a diagnostic message otherwise. Wire this into your platform's health check (Vercel cron, Kubernetes liveness probe, uptime monitor).

## Scaling Considerations

The application is stateless and horizontally scalable. The `pg` connection pool defaults to 10 connections per process; for a multi-instance deployment, size the Postgres `max_connections` accordingly. For high-traffic deployments, add PgBouncer in transaction-pooling mode between the app and the database.

The `/cosmos` route recomputes planetary positions on every request. This is a pure-CPU operation (sub-millisecond) and is not a scaling concern. The `force-dynamic` directive on data-fetching routes prevents Next.js from caching responses; if cache pressure becomes a concern, mark read-heavy routes with `revalidate: 3600` instead.

## Backups

The PostgreSQL database is the only stateful component. Back it up on whatever schedule your provider recommends (typically daily snapshots + WAL streaming for point-in-time recovery). The `knowledge/` directory is part of the repository and travels with the code; it does not need separate backup.

## Monitoring

The application logs to stdout/stderr. The Custodian API logs errors with the `[archivist]` prefix. The bootstrap logs seeding activity with `[bootstrap]`. Ship these to your log aggregator (Vercel logs, Datadog, Loki). No metrics are exported; add OpenTelemetry if you need distributed tracing.
