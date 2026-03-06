---
title: "The editor problem: tiptap vs prosemirror vs slate"
date: "Feb 28, 2026"
number: "002"
project: inkwell
excerpt: "Choosing a rich text editor is surprisingly hard. I tried all three. Here's what I found and where I landed."
tags: [inkwell, learnings]
featured: false
---

The editor is is one of the things that wil make the platform unique. If it feels wrong, nothing else matters. So I spent a week prototyping with three different approaches before committing.

## ProseMirror

The foundation everything else is built on. Incredibly powerful, battle-tested, used by Notion, Linear, and dozens of others. But the API is **low-level**. You're building the whole editing experience from primitives. That's power, but it's also weeks of work before you have something usable.

## Slate.js

React-native, flexible, good mental model. But the ecosystem is sparse and breaking changes in the past have burned people. I'm building something I want to maintain — shipping on a shaky dependency is a risk I didn't want to take.

## Tiptap

ProseMirror under the hood, React bindings, a growing extension ecosystem, and a clean API. This is what I went with. It has the right balance of **power and approachability**.

The first working editor session felt right. Clean, immediate, no obvious jank. That's the bar. If it feels right to type in, we're on the right track. Still needs a lot of care, but for now, the basics work.
