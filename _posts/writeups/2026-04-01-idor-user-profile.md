---
layout: post
title: "IDOR on User Profile Endpoint — HackerOne"
date: 2026-04-01
tag: writeup
visibility: public
description: "Classic IDOR via predictable integer IDs exposed profile data of any user without authentication."
topics:
  - idor
  - writeup
  - auth
bounty_ref: "001"
pinned: true
hot: true
likes: 0
---

## Overview

This writeup covers an Insecure Direct Object Reference (IDOR) vulnerability I found on a private program via HackerOne. The bug allowed any unauthenticated user to access private profile data by incrementing an integer ID in the API path.

> **Bounty:** $500 · Severity: Medium · Platform: HackerOne

---

## Recon

Started with standard recon: subdomain enumeration, crawling the JS bundles, mapping the API surface. Noticed the mobile API at `api.example.com/v2/` was chatty and returned more data than the web version.

## The Bug

While browsing my own profile, I captured the following request:

```
GET /v2/users/84312/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer <my_token>
```

The response returned my full profile object including email, phone, and private settings. Standard stuff. But then I noticed — what if I just changed the ID?

```
GET /v2/users/84311/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer <my_token>
```

Full profile data for user 84311. No ownership check. No authorization. Every user's private data was just... there.

## Impact

- Full name, email address, phone number of any user
- Private account settings
- Enumerable via sequential IDs starting at ~10000

## Timeline

| Date | Event |
|------|-------|
| Apr 1, 2026 | Reported via HackerOne |
| Apr 3, 2026 | Triaged as Medium |
| Apr 5, 2026 | Bounty awarded: $500 |
| Apr 7, 2026 | Fixed in production |

## Remediation

The fix was straightforward — validate that the authenticated user's ID matches the requested resource ID before returning data.

```python
# Before (vulnerable)
def get_profile(user_id):
    return db.get_user(user_id)

# After (fixed)
def get_profile(user_id, requesting_user_id):
    if user_id != requesting_user_id:
        raise Forbidden()
    return db.get_user(user_id)
```

---

*Filed under IDOR, first steps. More to come.*
