---
layout: post
title: "How I Find IDOR Bugs — Full Walkthrough"
date: 2026-04-05
tag: video
visibility: public
description: "Step-by-step video walkthrough of my IDOR hunting methodology on live programs."
topics:
  - idor
  - video
  - recon
pinned: false
hot: true
likes: 0
---

## Watch the Video

*[Video embed would go here — YouTube, etc.]*

---

## What's Covered

In this video I walk through my full IDOR hunting process from recon to report:

1. **Finding the API surface** — how I map endpoints quickly
2. **Identifying object references** — IDs, UUIDs, hashes
3. **Building a test matrix** — horizontal vs vertical IDOR
4. **Bypasses** — encoded IDs, UUID v4, indirect references
5. **Writing the report** — what triagers actually want to see

---

## Key Takeaways

- Always compare what **you can see** vs what **you should be able to see**
- Mobile APIs are often less hardened than web APIs
- UUID doesn't mean safe — check if the server validates ownership
- Horizontal IDOR (same role, different user) is more common than vertical

---

*More videos coming as the 1200-hour grind continues.*
