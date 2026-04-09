# mori.sh — Jekyll Site

A minimal, dark-accented bug bounty blog built with Jekyll.

## Quick Start

```bash
# 1. Install dependencies
bundle install

# 2. Serve locally
bundle exec jekyll serve

# 3. Open http://localhost:4000
```

---

## Directory Structure

```
mori/
├── _config.yml          # Site config — URL, title, defaults
├── _data/
│   ├── bounties.yml     # Bounty log — edit to add earnings
│   └── progress.yml     # Skills/certs/goals on About page
├── _layouts/
│   ├── default.html     # Base layout (nav + footer)
│   └── post.html        # Post layout (likes + comments)
├── _posts/              # All your posts (md files)
├── assets/css/
│   └── style.css        # All styles
├── index.html           # Posts list with search + filter
├── topics.html          # Topic grid with search + filter
├── about.html           # Progress tracking + bounty log
├── contact.html         # Social links
└── admin.html           # Admin panel (password protected)
```

---

## Writing Posts

Create a file in `_posts/` named `YYYY-MM-DD-your-slug.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-04-08
tag: writeup          # writeup | video | notes
visibility: private   # private | hidden | public
description: "Short description shown in lists and search"
topics:
  - idor              # idor | ssrf | xss | logic | auth |
  - writeup           # graphql | recon | ai | video | writeup
bounty_ref: "001"     # optional: link to a bounty in bounties.yml
likes: 0
---

Your content in Markdown...
```

### Visibility States

| State | Listed? | Direct URL? | In Admin? |
|-------|---------|-------------|-----------|
| `private` | ✗ | ✓ | ✓ |
| `hidden` | ✗ | ✓ | ✗ |
| `public` | ✓ | ✓ | ✓ |

**Workflow:** Write with `visibility: private` → preview at `/posts/your-slug/` → change to `public` when ready.

---

## Adding Bounties

Edit `_data/bounties.yml`:

```yaml
entries:
  - id: "002"
    date: "Apr 2026"
    title: "XSS in comment field"
    amount: 750
    severity: high        # critical | high | medium | low | info
    platform: bugcrowd
    program: "Acme Corp"
    notes: "Stored XSS via unsanitized comment body"
    writeup: "/posts/xss-comment-field/"
```

The About page total **auto-calculates** from all entries. The progress bar and report count update automatically.

### Referencing a Bounty in a Post

Add `bounty_ref: "002"` to your post's front matter. A linked badge will appear in the post header.

### Using the Admin Panel Generator

Visit `/admin/` (password: `mori2026` — change in `admin.html`) → Bounty Log tab → fill in the form → copy the generated YAML.

---

## Updating Progress (About Page)

Edit `_data/progress.yml`:

```yaml
bounty_target: 100000  # goal in dollars

skills:
  web: 35    # 0-100
  code: 20
  recon: 40
  ai: 10
  yt: 5

certs:
  oswe: 0    # 0-100 (course progress)
  oscp: 15
  osai: 0

goals:
  bounty1: true    # set true when achieved
  tenk: false
  hundredk: false
  oswe: false
  youtube: false
  fulltime: false
```

---

## Admin Panel

URL: `/admin/`
Default password: `mori2026`

**To change the password:** Open `admin.html` and change `const ADMIN_PW = 'mori2026';`

### Features
- **All Posts tab** — View every post including private/hidden drafts
- **New Post Guide** — Front matter template with all fields explained
- **Bounty Log tab** — Summary stats + YAML generator for new entries
- **Visibility tab** — Reference guide for all visibility states

---

## Search

Both `index.html` and `topics.html` have real-time search that:
- Filters as you type
- Searches post titles, tags, topics, and descriptions
- Works together with tag/topic filters (AND logic)
- Highlights matching text in results

---

## Likes & Comments

All likes and comments are stored in `localStorage` (client-side, no server needed). They persist across page loads for each visitor.

To add permanent/server-side comments in the future, replace the `submitComment()` function in `_layouts/post.html` with a call to a service like Utterances (GitHub Issues), Disqus, or a custom API.

---

## Deployment

### GitHub Pages

```bash
# Push to main branch — GitHub Pages builds automatically
git init
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_USER/YOUR_REPO
git push -u origin main
```

Then enable GitHub Pages in repo Settings → Pages → Source: Deploy from branch (main).

### Netlify

Connect your GitHub repo in Netlify. Build command: `jekyll build`. Publish directory: `_site`.

---

## Customizing Contact Links

Edit `contact.html` — replace `YOUR_HANDLE`, `YOUR_USERNAME`, etc. with your actual handles.

---

## License

Do whatever you want with this.
