---
layout: post
title: "Week Two — First Real Recon Session"
date: 2026-03-31
tag: notes
visibility: public
description: "What actually happens when you sit down and try to recon a live program for the first time."
topics:
  - journey
  - notes
  - recon
pinned: false
hot: false
likes: 0
---

## What I did

Picked a public VDP on HackerOne. Spent four hours doing recon using what I'd read about: subfinder, httpx, gau, manual JS review.

Found 200+ subdomains. Most were dead. About 30 were live and interesting. Spent the rest of the session going through them manually.

## What I found

Nothing reportable. A few interesting endpoints that led nowhere. One staging server with verbose error messages — not a vulnerability in itself, just noise.

This is the part nobody talks about. Most sessions end with nothing.

## What I learned

- The recon tools are straightforward. The judgment of *what to investigate* is not.
- Verbose errors are everywhere. The question is always: does this leak something useful to an attacker?
- Staging servers often have weaker access controls — worth returning to.

## Hours logged

Session: 4 hrs · Running total: ~28 hrs

---

*Nothing to report yet. That's fine. The practice is the point right now.*
