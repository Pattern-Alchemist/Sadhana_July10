# Sadhana: 15-Minute Deployment Guide

Deploy to production in **15 minutes** with **zero cost** using Vercel + Neon.

---

## Prerequisites ✅

- [ ] GitHub account (free)
- [ ] Vercel account (free)
- [ ] 15 minutes

---

## Step 1: Create PostgreSQL Database (3 min)

```bash
# 1. Visit https://neon.tech
# 2. Click "Sign Up" (free, no credit card)
# 3. Complete email verification
# 4. Click "New Project"
# 5. Name: "sadhana"
# 6. Region: closest to you
# 7. Click "Create Project"
```

**Copy this string from the dashboard:**
```
postgresql://neondb_owner:YOUR_PASSWORD@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Save it — you'll need it in Step 3.

---

## Step 2: Push Code to GitHub (3 min)

If code is already on GitHub, skip to Step 3.

```bash
# 1. Go to https://github.com/new
# 2. Create repo: name "sadhana" (private OK)
# 3. Follow on-screen instructions:

cd /path/to/project
git remote add origin https://github.com/YOUR_USERNAME/sadhana.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel (5 min)

```bash
# 1. Visit https://vercel.com/new
# 2. Click "Continue with GitHub"
# 3. Select "sadhana" repository
# 4. Click "Import"

# 5. In "Configure Project":
#    - Framework: Next.js (auto-detected ✓)
#    - Root Directory: ./ ✓
#    - Build Command: npm run build ✓
#    - Output Directory: .next ✓

# 6. Expand "Environment Variables"
# 7. Add two variables:

   KEY: DATABASE_URL
   VALUE: [paste Neon connection string from Step 1]

   KEY: NEXT_PUBLIC_SITE_URL
   VALUE: https://sadhana-XXXXX.vercel.app
   (replace XXXXX with your Vercel URL once deployment completes)

# 8. Click "Deploy"
# 9. Wait 2-3 minutes for build...
```

---

## Step 4: Verify Deployment (2 min)

Once Vercel shows "Deployment Complete":

```bash
# Open your new URL in browser:
https://sadhana-XXXXX.vercel.app

# Expected: Homepage loads with:
# - Cosmic Shiva hero image
# - Daily practice widgets
# - 41+ siddhis in archive
# - All voice commands work

# Test API health:
curl https://sadhana-XXXXX.vercel.app/api/health
# Response: { "status": "ok" }
```

---

## Step 5: Test Voice Commands (2 min)

In your browser, visit:
```
https://sadhana-XXXXX.vercel.app/voice-command
```

Try these commands:
- "Open archive"
- "Start meditation"
- "Show random practice"
- "Search for Kali"

✅ If they work, deployment is successful!

---

## Done! 🎉

Your personal Sadhana companion is now live at:
```
https://sadhana-XXXXX.vercel.app
```

### Next Steps (Optional)

**Add Custom Domain:**
- Vercel Settings → Domains → Add Custom Domain
- Point your domain's DNS to Vercel nameservers

**Install as PWA (Mobile):**
- Open app in Chrome on your phone
- Menu → "Add to Home Screen"
- App installs with Śrī Cakra icon
- Works offline

**Enable Monitoring:**
- Vercel Analytics: Vercel Dashboard → Settings → Analytics
- Real-time performance metrics

**Set Auto-Deploy:**
- Already enabled! Push to `main` branch → auto-deploys

---

## Troubleshooting

### Build Failed
```bash
# Check logs in Vercel Dashboard → Deployments → [failed build]
# Common issue: DATABASE_URL not set
# Fix: Vercel Settings → Environment Variables → verify DATABASE_URL
```

### Blank Page / 500 Error
```bash
# App takes 10-30 seconds on first boot (schema initialization)
# Solution: Hard refresh (Ctrl+Shift+R) after 30 seconds
# If still broken, check Vercel logs
```

### Voice Commands Don't Work
```bash
# Browser support: Chrome, Edge, Safari only (not Firefox yet)
# Permission issue: Browser → Settings → Microphone → Allow
# Test: https://sadhana-XXXXX.vercel.app/voice-command
```

### Database Connection Failed
```bash
# Check DATABASE_URL format:
# Should start with: postgresql://
# Should include:    ?sslmode=require

# Verify in Vercel:
# Settings → Environment Variables → DATABASE_URL value correct
# Re-deployment after fixing: git push → auto-redeploys
```

---

## Cost Breakdown

| Service | Free Tier | Used By Sadhana | Cost |
|---------|-----------|---|---|
| **Neon** | 0.5 GB storage, 100 hrs/mo | 10-50 MB | FREE |
| **Vercel** | 100 GB bandwidth, 1000 builds/mo | 5-20 MB/day | FREE |
| **GitHub** | Unlimited private repos | 1 repo | FREE |
| **TOTAL MONTHLY** | — | — | **$0** |

---

## Architecture Overview

```
GitHub                Vercel                  Neon
  ↓                     ↓                       ↓
[sadhana repo] → [Next.js App] ← [PostgreSQL DB]
                   ↓
            [CDN + Caching]
                   ↓
            [Your Domain]
```

- **Frontend:** Static Next.js (Vercel CDN)
- **Backend:** Serverless functions (Vercel)
- **Database:** PostgreSQL (Neon)
- **Auth:** None (public) / Client-side encryption (personal data)

---

## Security

- ✅ No user data stored on server (public content only)
- ✅ Personal journal/vault encrypted in browser (AES-256-GCM)
- ✅ SSL/TLS enforced (sslmode=require)
- ✅ No analytics, no tracking, no telemetry
- ✅ Security headers included (HSTS, X-Frame-Options, CSP)

---

## Next: Advanced Customization

- **Add More Siddhis:** See `docs/CONTRIBUTING.md`
- **Customize Colors:** Edit `app/globals.css` theme tokens
- **Add Learning Paths:** See `lib/curriculum-data.ts`
- **Enable Comments/Reviews:** See `ROADMAP.md`

---

## Support

- **Issues:** Check `/docs` folder for detailed guides
- **Questions:** See `README.md` FAQ section
- **Bugs:** Open issue on GitHub
- **Deployment Help:** See `DEPLOYMENT_CHECKLIST.md`

---

**Status:** ✅ Ready to deploy
**Build:** ✅ Verified passing
**Performance:** ✅ Optimized
**Security:** ✅ Hardened
**Documentation:** ✅ Complete

**Deploy now. Your Sadhana companion awaits!** 🙏
