---
title: "Picking the stack: Next.js + Supabase"
date: "Mar 02, 2026"
number: "003"
project: inkwell
excerpt: "I went back and forth on this longer than I should have. Here's what I landed on and the reasoning behind it."
tags: [inkwell, learnings]
featured: false
---

Stack decisions are a trap. You can bikeshed them forever and build nothing. So here's what I did: I set a 48-hour deadline to decide and ship the first scaffold.

## The constraints

It needs to be fast to prototype. The auth and database story needs to be simple. I want **real-time** capability eventually (collaborative editing is on the roadmap). And I need to be able to deploy it without ops overhead.

## Why Next.js

Honestly? Familiarity. I know it well. App Router is mature now, the DX is good, and the ecosystem around it is massive. No regrets here.

## Why Supabase

Postgres under the hood, excellent real-time support via websockets, auth baked in, and a generous free tier. The alternative was PlanetScale + Clerk + Pusher and that's three things to worry about instead of one.
