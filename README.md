# Loopwork

![E2E tests](https://github.com/Rojibyte/loopwork/actions/workflows/e2e.yml/badge.svg)

A demo marketing site for a fictional lifecycle email and CMS agency, built with **Astro** and **Sanity**. Content is edited in a headless CMS, the site is generated statically, and publishing in the Studio automatically rebuilds the live site.

**Live site:** https://loopwork-smoky.vercel.app/
**Studio:** https://loopwork.sanity.studio/

> **Demo content.** Loopwork, its clients (Alder & Six, Quarry North, Lowlight), and all metrics are fictional. Each case study is labeled "Sample project" on the site.

## Why I built it

I built Loopwork to learn Astro and Sanity by shipping something real instead of following a tutorial. I work in React and Next.js day to day (see my portfolio and widget showcase below), and I wanted to see how Astro’s content-first, static approach and a headless CMS compare with the component-heavy and platform-based tools I already use. I chose a subject I know well, a lifecycle email and CMS agency drawing on my Braze and Eloqua experience, so the learning effort could go into the stack rather than the content.

## Stack

| Layer         | Choice                                                   |
| ------------- | -------------------------------------------------------- |
| Framework     | Astro (static output)                                    |
| CMS           | Sanity (Studio in `studio/`)                             |
| Data fetching | `@sanity/client` with GROQ, at build time                |
| Language      | TypeScript for the data layer, plain `.astro` components |
| Styling       | Hand-written CSS with custom properties                  |
| Hosting       | Vercel (root directory `web`)                            |

## How it works

```
loopwork/
├── studio/   Sanity Studio: schemas for caseStudy and service
└── web/      Astro site
    ├── src/lib/sanity.ts            client + typed GROQ queries
    ├── src/layouts/Layout.astro     shared <head>, global CSS, slot
    ├── src/components/              Work, Services, Process, Contact sections
    └── src/pages/
        ├── index.astro
        └── work/[slug].astro        one page per case study
```

- **Content in the CMS:** case studies and services are Sanity documents. The page structure and copy for the process and contact sections are plain components, because that content rarely changes and doesn't need an editor.
- **Static generation:** `work/[slug].astro` uses `getStaticPaths` to fetch every case study at build time and generate one HTML page per slug.
- **Rebuild on publish:** a Sanity webhook (filtered to `caseStudy` and `service`) calls a Vercel deploy hook, so publishing in the Studio updates the live site after the build finishes.
- **Contact form:** client-side validation with accessible error messages (`aria-invalid`, `aria-describedby`, and a focused error summary). It is a demo and **sends nothing**; the page says so.

## Run it locally

```bash
# Studio
cd studio
npm install
npm run dev          # http://localhost:3333

# Site (second terminal)
cd web
npm install
cp .env.example .env # then fill in your Sanity project ID
npm run dev          # http://localhost:4321
```

Required environment variables for `web`:

```
SANITY_PROJECT_ID=
SANITY_DATASET=production
```

Seed data lives in `studio/caseStudies.ndjson` and `studio/services.ndjson`:

```bash
cd studio
npx sanity dataset import caseStudies.ndjson production --replace
npx sanity dataset import services.ndjson production --replace
```

## Tests

Playwright smoke tests cover the home page, the Sanity-driven sections, case study navigation, and the contact form validation.

    cd web
    npm run test:e2e

## Things I ran into

- **Nested Git repos.** Both scaffolders had initialized their own `.git`, so the root repo would have pushed the folders as empty submodules. I removed them and used one repo.
- **Stale deploys.** Publishing twice in quick succession started two builds, and the older one went live. Because the site is static, it is only as fresh as its last successful build, so I wait for a deployment to finish before publishing again.
- **Build-time fetching.** The Sanity client uses `useCdn: false` so a build started right after a publish never reads a cached copy.
- **Case-sensitive file names.** A `.Astro` file extension works on Windows but breaks on Linux build servers, so I renamed it before deploying.

## Not built yet

- FAQ and closing call-to-action sections from the original design
- Decorative visuals on the case study cards
- A working form backend (the form is a front-end demo)
- Rich body content and images for case study pages, which currently show the same fields as the cards

## How I worked

The visual design started as a prototype generated with an Open Design (Deepseek). I implemented it in Astro, designed the Sanity schemas, wired the data layer, set up deployment and the rebuild webhook, and debugged the issues above. I used Claude as a chat-based pairing tool while learning Astro and Sanity, and I can walk through any part of the code.

## Lighthouse Scores

- 94 Performance
- 98 Accessibility
- 96 Best Practices
- 90 SEO

## Other work

- [Portfolio](https://rdeguito.dev/): Next.js (App Router)
- [Trovely](https://trovely-shop.vercel.app/): Next.js + Tailwind + Zustands + Prisma + Supabase + Clerk
- [Duda Widget Showcase](https://widget-showcase-rogelio.vercel.app/): React + GSAP
