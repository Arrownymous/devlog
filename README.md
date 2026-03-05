# Arrownymous Devlog

A minimal, techy devlog site built with Next.js 14 (App Router), TypeScript, and TailwindCSS.

## Stack

- **Next.js 14** — App Router, server components
- **TypeScript**
- **TailwindCSS** — utility classes + custom CSS variables
- **gray-matter** — parses markdown frontmatter
- **Dark/light toggle** — persisted to localStorage

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new post

Create a `.md` file in `content/posts/`:

```md
---
title: "Your post title"
date: "Mar 10, 2026"
number: "005"
project: inkwell
excerpt: "One sentence summary shown in the post list."
tags: [inkwell, learnings]
featured: false
---

Your content here. Supports **bold**, `code`, and code blocks.
```

The filename becomes the URL slug: `005-your-post.md` → `/devlog/005-your-post`

## Structure

```
app/
  layout.tsx          ← root layout (sidebar + topbar)
  page.tsx            ← home
  devlog/
    page.tsx          ← post list with filter
    [slug]/page.tsx   ← individual post
  about/page.tsx      ← about page
  globals.css         ← all styles + theme tokens

components/
  ThemeProvider.tsx   ← dark/light context
  Sidebar.tsx         ← sidebar nav + theme toggle
  Topbar.tsx          ← breadcrumb bar
  PostCard.tsx        ← post list item

content/posts/        ← your markdown files go here
lib/posts.ts          ← reads + parses posts
```

## Deployment

Works out of the box on **Vercel** — just connect your repo.
