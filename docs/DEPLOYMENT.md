# ION - Production Deployment Guide

## Vercel Deployment

### Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Supabase Project** - Production database configured
3. **Environment Variables** - Required secrets ready

---

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Select the ION project
   - Click "Import"

2. **Configure Project:**
   - **Framework Preset:** SvelteKit (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-configured)
   - **Output Directory:** `.svelte-kit` (auto-configured)
   - **Install Command:** `npm install` (auto-configured)

3. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   PUBLIC_SUPABASE_URL=your_supabase_project_url
   PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # First deployment (follow prompts)
   vercel

   # For production deployment
   vercel --prod
   ```

4. **Set Environment Variables:**
   ```bash
   vercel env add PUBLIC_SUPABASE_URL
   # Paste your Supabase URL when prompted

   vercel env add PUBLIC_SUPABASE_ANON_KEY
   # Paste your Supabase anon key when prompted
   ```

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### Where to Find Values

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy:
   - **Project URL** → `PUBLIC_SUPABASE_URL`
   - **anon public** key → `PUBLIC_SUPABASE_ANON_KEY`

---

## Post-Deployment Checklist

### 1. Verify Deployment ✅

- [ ] Site loads successfully
- [ ] No console errors
- [ ] Login page displays correctly
- [ ] Authentication works
- [ ] Dashboard loads with widgets
- [ ] All 6 widgets display data

### 2. Run Lighthouse Audit ✅

1. Open deployed site in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Run audit on:
   - `/login` page
   - `/dashboard` page (after logging in)

**Expected Scores:**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### 3. Security Verification ✅

- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers configured
- [ ] Authentication working
- [ ] API endpoints protected
- [ ] No sensitive data exposed

### 4. Functional Testing ✅

- [ ] User can log in
- [ ] Dashboard displays all widgets
- [ ] Data loads correctly
- [ ] No broken links
- [ ] Logout works
- [ ] Responsive on mobile, tablet, desktop

---

## Domain Configuration (Optional)

### Add Custom Domain

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Click "Add Domain"
4. Enter your domain (e.g., `ion.yourdomain.com`)
5. Follow DNS configuration instructions
6. Wait for DNS propagation (~5-30 minutes)

### DNS Records

Add these records to your DNS provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Monitoring & Analytics

### Vercel Analytics (Recommended)

1. Go to your project dashboard
2. Navigate to **Analytics** tab
3. Enable Vercel Analytics
4. Monitor:
   - Page views
   - Performance metrics
   - Core Web Vitals

### Enable Error Tracking

Consider integrating:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Vercel Speed Insights** - Performance monitoring

---

## Database Seeding

### Populate Production Database

1. **Connect to Supabase:**
   ```bash
   # Update .env with production credentials
   PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
   ```

2. **Run Seed Script:**
   ```bash
   npm run db:seed
   ```

3. **Verify Data:**
   - Check Supabase dashboard
   - Verify tables populated:
     - `initiatives`
     - `risks`
     - `team_metrics`
     - `activity_feed`

---

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys:
- **Production:** Commits to `main` branch
- **Preview:** Pull requests and feature branches

### Deploy Hooks

Create a deploy hook for manual deployments:
1. Go to **Settings** → **Git**
2. Click "Create Hook"
3. Copy webhook URL
4. Trigger deployments via HTTP POST

---

## Troubleshooting

### Build Fails

**Error:** `Cannot find module '@sveltejs/adapter-vercel'`
```bash
# Solution: Ensure package is installed
npm install -D @sveltejs/adapter-vercel
```

**Error:** `PUBLIC_SUPABASE_URL is not defined`
```bash
# Solution: Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

### Runtime Errors

**Error:** `Invalid supabaseUrl`
```bash
# Solution: Check environment variables are set correctly
# Redeploy after adding variables
```

**Error:** `Authentication failed`
```bash
# Solution: Verify Supabase credentials
# Check RLS policies in Supabase
```

### Performance Issues

**Slow page loads:**
1. Check Vercel Analytics for bottlenecks
2. Verify database queries are optimized
3. Enable caching headers (already configured)
4. Use Vercel Edge Functions for API routes

---

## Rollback Strategy

### Revert to Previous Deployment

1. Go to Vercel dashboard
2. Navigate to **Deployments**
3. Find previous successful deployment
4. Click "..." → "Promote to Production"

### Instant Rollback

```bash
# Via CLI
vercel rollback
```

---

## Performance Optimization

### Already Implemented ✅

- Code splitting (automatic via Vite)
- Asset optimization (CSS purging)
- Caching headers (vercel.json)
- Security headers (vercel.json)
- Serverless functions for API

### Additional Optimizations

1. **Enable Vercel Edge Network:**
   - Automatic on all deployments
   - Global CDN distribution

2. **Enable Compression:**
   - Automatic gzip/brotli compression

3. **Image Optimization:**
   - Use Vercel Image Optimization API (if adding images)

---

## Cost Estimation

### Vercel Pricing (as of 2024)

**Hobby (Free):**
- ✅ Perfect for ION Dashboard
- Unlimited deployments
- 100 GB bandwidth/month
- Serverless functions included
- Analytics included
- HTTPS & custom domains

**Pro ($20/month):**
- Needed if:
  - >100 GB bandwidth
  - Team collaboration required
  - Advanced analytics needed

### Supabase Pricing

**Free Tier:**
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth
- Perfect for development/small teams

**Pro ($25/month):**
- 8 GB database
- 100 GB file storage
- 50 GB bandwidth
- Recommended for production

---

## Security Best Practices

### Implemented ✅

1. **Environment Variables:** Stored securely in Vercel
2. **HTTPS:** Enforced automatically
3. **Security Headers:** Configured in vercel.json
4. **Authentication:** Supabase Auth with getUser() validation
5. **RLS Policies:** Database-level security

### Additional Recommendations

1. **Enable 2FA** on Vercel account
2. **Rotate Secrets** regularly
3. **Monitor Logs** for suspicious activity
4. **Set up Alerts** for failed authentications
5. **Enable CORS** restrictions (if needed)

---

## Support & Resources

### Documentation

- **Vercel Docs:** https://vercel.com/docs
- **SvelteKit Docs:** https://kit.svelte.dev/docs
- **Supabase Docs:** https://supabase.com/docs

### Vercel Support

- **Community:** https://github.com/vercel/vercel/discussions
- **Support:** support@vercel.com

---

## Deployment Summary

✅ **Vercel adapter configured**
✅ **vercel.json created with optimal settings**
✅ **Security headers configured**
✅ **Caching headers optimized**
✅ **Environment variables documented**
✅ **Deployment guide complete**

**Status:** Ready for production deployment!

---

## Next Steps

1. ✅ **Deploy to Vercel** (follow steps above)
2. ✅ **Verify deployment** works
3. ✅ **Run Lighthouse audit** on production
4. ✅ **Monitor performance** via Vercel Analytics
5. ✅ **Document actual Lighthouse scores**
6. 🎉 **Celebrate successful deployment!**
