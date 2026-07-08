# AstroKalki — Deployment Guide

Deploy AstroKalki to the web for free using **Neon** (PostgreSQL) + **Vercel** (Next.js hosting). Both have generous free tiers — no cost, no credit card required.

## Prerequisites

- A GitHub account (free)
- The Arena_Export.zip file from this project
- 15 minutes

## Step 1: Create a Free PostgreSQL Database on Neon

1. Go to **https://neon.tech** → Sign up (free, no credit card)
2. Click **"New Project"**
3. Name it `astrokalki`
4. Select the closest region
5. Click **"Create Project"**
6. On the dashboard, find the **"Connection string"** — it looks like:
   ```
   postgresql://neondb_owner:AbCdEf123456@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
7. **Copy this string** — you'll need it for Vercel

## Step 2: Push the Code to GitHub

1. Unzip `Arena_Export.zip` on your computer:
   ```bash
   unzip Arena_Export.zip
   cd Arena_Export
   ```

2. Remove `node_modules` and `.next` if present:
   ```bash
   rm -rf node_modules .next
   ```

3. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "AstroKalki v2.2.0 — personal sadhana companion"
   ```
   - Go to **https://github.com/new** → create a **private** repository named `astrokalki`
   - Follow the instructions to push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/astrokalki.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

1. Go to **https://vercel.com** → Sign up with GitHub (free)
2. Click **"Add New Project"**
3. Import the `astrokalki` repository
4. Vercel auto-detects Next.js — the defaults are correct
5. **Add the environment variable:**
   - Expand **"Environment Variables"**
   - Key: `DATABASE_URL`
   - Value: paste the Neon connection string from Step 1
   - Click **"Add"**
6. Click **"Deploy"**
7. Wait ~2-3 minutes for the build to complete
8. Your app is live at `https://astrokalki-xxx.vercel.app` 🎉

## Step 4: Verify

1. Visit your Vercel URL
2. The app will self-heal its database on first request (creates tables + seeds 41 siddhis)
3. Set your encrypted vault passphrase on first visit
4. Try these routes:
   - `/archive` — the 41-siddhi corpus
   - `/yantras` — the 18-yantra gallery
   - `/japa` — the digital japa mālā
   - `/calendar` — the lunar calendar
   - `/journal` — your encrypted practice journal

## Step 5: Install as a PWA on Your Phone

1. Open your Vercel URL in **Chrome on your phone**
2. Tap the **menu** (three dots)
3. Tap **"Add to Home Screen"**
4. The app installs with the Śrī Cakra icon
5. It works **offline** — the service worker caches the entire corpus

## Alternative: Supabase Instead of Neon

If you prefer Supabase:

1. Go to **https://supabase.com** → Sign up (free)
2. Create a new project
3. Go to **Project Settings → Database → Connection string**
4. Copy the **URI** connection string
5. Use that as `DATABASE_URL` in Vercel
6. Note: Supabase's free tier pauses the database after 1 week of inactivity. Neon does not.

## Alternative: Run Locally

If you want to run on your own machine:

```bash
# Install PostgreSQL locally (or use Docker)
# Create a database:
createdb astrokalki

# Set the environment variable:
export DATABASE_URL="postgresql://user:password@localhost:5432/astrokalki"

# Install and run:
cd Arena_Export
npm install
npm run dev
# Open http://localhost:3000
```

## Troubleshooting

**"ECONNREFUSED" error on first visit:**
The app can't connect to the database. Check that `DATABASE_URL` is set correctly in Vercel → Settings → Environment Variables.

**Blank page / 500 error:**
Wait 30 seconds after deployment — the first request triggers the database bootstrap which takes a few seconds on a cold start.

**Mantra vault / journal data lost after redeploy:**
This is expected. All personal data is stored in the browser's localStorage (encrypted), not on the server. Clearing browser data or using a different browser/device starts fresh. Use `/export` to back up your data as a markdown file.

**Service worker not updating:**
Hard refresh (Ctrl+Shift+R) or clear site data in browser dev tools → Application → Storage → Clear site data.

## Cost

| Service | Free Tier | Enough for? |
|---------|-----------|-------------|
| **Neon** | 0.5 GB storage, 100 compute hours/month | ~10,000 siddhis + all your journal data |
| **Vercel** | 100 GB bandwidth, 1000 builds/month | A personal app used daily |
| **GitHub** | Private repos, unlimited | Source code hosting |

**Total cost: $0/month** for a single-user personal sadhana companion.

## Security Notes

- All personal data (journal, cycles, case notes, mantra vault) is **AES-256-GCM encrypted** in the browser's localStorage
- The server only stores the siddhi corpus, manuscripts, and evidence sources (public content)
- The `DATABASE_URL` is a server-side environment variable — never exposed to the browser
- The vault passphrase never leaves the browser
- No analytics, no telemetry, no tracking
- The `.env` file in the repository contains only the example — never commit real credentials
