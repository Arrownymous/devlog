---
title: "Why I'm building yet another writing app"
date: "Mar 04, 2026"
number: "004"
project: inkwell
excerpt: "Every writing app fails writers the same way. Here's the problem I keep running into, and why I think the solution is simpler than everyone makes it."
tags: [inkwell, meta]
featured: true
---

I've tried everything. Notion, Obsidian, iA Writer, Bear, Ulysses. They're all fine apps. Some are great apps. But none of them feel like **writing**.

## The fundamental problem

Most writing apps are really *organization* apps with a text editor bolted on. The mental model is wrong from the start. A writer doesn't open a document like they open a spreadsheet. Writing is more like thinking out loud, and the interface should get out of the way.

The moment you add folders, tags, databases, and sync indicators, you've already lost the plot. The tool is now something you maintain instead of something you use.

## What Inkwell is trying to be

Fast. Immediate. Opinionated. You open it, you write. The structure emerges from the work, not from an architecture you set up in advance.

```js
// what I want from a writing tool
const ideal = {
  openTime: '< 1 second',
  friction: 'zero',
  features: 'only what writing needs',
  distractions: 'none'
}
```

This first entry is mostly me documenting why I started. The next ones will get into the actual build — what I'm choosing, why, and what breaks.

Let's go.
