---
layout: post
title: "Recon Methodology Notes — 2026"
date: 2026-03-28
tag: notes
visibility: hidden
description: "Personal recon checklist and tool stack. Hidden — shareable by link but not listed publicly."
topics:
  - recon
  - notes
likes: 0
---

## My Current Recon Stack

These are personal notes, not a tutorial. Sharing the link with a few people from the community but keeping it off the main feed.

### Subdomain Enumeration

1. `subfinder -d target.com -o subs.txt`
2. `amass enum -passive -d target.com >> subs.txt`
3. `httpx -l subs.txt -o live.txt`

### JS Analysis

- `gau` for historical URLs
- `LinkFinder` for endpoints in JS
- Manual review of webpack bundles

### API Discovery

- Check `/api/v1/`, `/api/v2/`, `/graphql`, `/swagger.json`
- Mobile apps — decompile APK with `jadx`
- Compare mobile API vs web API surface

### My Current Toolbox

| Tool | Purpose |
|------|---------|
| Burp Suite Pro | Manual testing |
| subfinder | Subdomain enum |
| httpx | Probing live hosts |
| nuclei | Automated scanning |
| amass | Passive recon |
| ffuf | Fuzzing |

---

*Updated as my methodology evolves. Last update: Apr 2026.*
