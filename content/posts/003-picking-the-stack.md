---
title: "Picking the stack: Next.js + Supabase"
date: "Mar 02, 2026"
number: "003"
project: inkwell
excerpt: "Offource I go for next.js and Supabase"
tags: [inkwell, learnings]
featured: false
---

Choosing the right tech stack was fairly straightforward for me. I’ve worked with React before, and I’ve previously used Supabase for a back‑end project, so the combination felt natural.


## The constraints

It needs to be fast to prototype. The auth and database story needs to be simple. I want **real-time** capability eventually (collaborative editing is on the roadmap). And I need to be able to deploy it without ops overhead.

## Why Next.js

Honestly? Familiarity. I know it well. App Router is mature now and the ecosystem around it is massive. No regrets here.

## Why Supabase

Postgres under the hood, excellent real-time support via websockets, auth baked in, and a generous free tier. The alternative was PlanetScale + Clerk + Pusher and that's three things to worry about instead of one.
