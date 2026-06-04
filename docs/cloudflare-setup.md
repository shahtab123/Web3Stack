# Cloudflare + Vercel (Web3Scout)

Use Cloudflare for **free DNS**, **CDN/proxy**, **SSL**, **caching**, and **basic DDoS protection**. Vercel still hosts the Next.js app; Cloudflare sits in front of your domain.

## 1. Add your domain to Vercel first

1. Open [Vercel Dashboard](https://vercel.com) → your **Web3Scout** project → **Settings** → **Domains**.
2. Add `web3scout.com` (and `www` if you use it).
3. Note the DNS targets Vercel shows (usually `cname.vercel-dns.com` for `www`, and A records or CNAME for apex).

Set in Vercel **Environment Variables** (Production):

```env
NEXT_PUBLIC_SITE_URL=https://web3scout.com
```

Redeploy after changing this.

## 2. Add the domain to Cloudflare

1. Sign up at [cloudflare.com](https://www.cloudflare.com) (free plan).
2. **Add a site** → enter your domain → choose **Free** plan.
3. Cloudflare scans existing DNS records — keep useful ones, delete conflicts later.
4. Cloudflare gives you **two nameservers** (e.g. `ada.ns.cloudflare.com`).

## 3. Point your registrar to Cloudflare

At your domain registrar (Namecheap, GoDaddy, etc.):

- Replace nameservers with Cloudflare’s two NS records.
- Wait until Cloudflare shows **Active** (often 5 minutes–48 hours).

## 4. DNS records in Cloudflare

In **DNS** → **Records**, typical setup for Vercel:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| `CNAME` | `www` | `cname.vercel-dns.com` | **Proxied** (orange cloud) |
| `A` | `@` | Vercel apex IPs from Vercel domain settings | **Proxied** |

Or use Vercel’s recommended records from the Domains page exactly as shown.

**Important:** Orange cloud (**Proxied**) = traffic goes through Cloudflare CDN + DDoS. Grey cloud = DNS only.

## 5. SSL/TLS (required)

**SSL/TLS** → **Overview**:

- Set encryption mode to **Full (strict)**.

**SSL/TLS** → **Edge Certificates**:

- **Always Use HTTPS**: On
- **Automatic HTTPS Rewrites**: On
- **Minimum TLS Version**: 1.2

Vercel provides a valid certificate on their side; Full (strict) avoids redirect loops and mixed content.

## 6. Speed settings (recommended)

**Speed** → **Optimization**:

- **Brotli**: On
- **Auto Minify**: Off for HTML/JS/CSS (Next.js is already optimized; minify can break builds in edge cases)

**Caching** → **Configuration**:

- **Caching Level**: Standard
- **Browser Cache TTL**: Respect Existing Headers (Vercel/Next set these)

### Cache Rules (Free plan)

Create rules in **Caching** → **Cache Rules**:

**Rule 1 — Cache static assets**

- When: URI Path starts with `/_next/static/`
- Then: Cache eligibility **Eligible for cache**, Edge TTL **1 month**

**Rule 2 — Cache public images**

- When: URI Path is one of `/og-image.png`, `/twitter-card.png`, `/marketing.png`, `/icon`, `/apple-icon`
- Then: Eligible for cache, Edge TTL **1 week**

**Rule 3 — Do not cache HTML / API**

- When: URI Path starts with `/api/` OR Request Method is not GET
- Then: **Bypass cache**

**Rule 4 — Bypass dynamic search**

- When: URI Path starts with `/search`
- Then: **Bypass cache**

Default: Next.js pages and `fetch` on Vercel are generated at the edge; bypassing HTML cache avoids stale content after deploys.

## 7. Security (optional but useful)

**Security** → **Settings**:

- **Security Level**: Medium
- **Bot Fight Mode**: On (may challenge aggressive bots; turn off if it blocks legitimate crawlers)

**DNS** → **DNSSEC**: Enable if your registrar supports it.

## 8. Purge cache after deploy

After each production deploy:

**Caching** → **Configuration** → **Purge Cache** → **Purge Everything**  
(or purge only `/_next/static/*` and `/og-image.png` if you prefer)

## 9. Verify

- `https://your-domain.com` loads with a valid padlock.
- [SSL Labs test](https://www.ssllabs.com/ssltest/) — grade A or A+.
- Check response headers: `cf-cache-status` on static files (HIT after second request).
- Vercel deployment still shows successful builds.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Redirect loop | SSL mode must be **Full (strict)**, not Flexible |
| Old HTML after deploy | Purge Cloudflare cache; ensure HTML bypass rule exists |
| 525 SSL handshake failed | Re-check domain on Vercel; wait for cert provisioning |
| API routes cached | Add bypass rule for `/api/*` |
| Wrong OG URLs | Set `NEXT_PUBLIC_SITE_URL` to `https://your-domain.com` |

## What Vercel already provides

Even without Cloudflare, Vercel’s edge network caches static output and `public/` files. Cloudflare adds:

- Faster DNS globally
- Extra edge caching for images and `/_next/static`
- DDoS and bot mitigation at the edge
- Free universal SSL on your custom domain

You do **not** need a paid CDN on top of this stack for a directory site.
