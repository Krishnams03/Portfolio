## Personal Portfolio (Next.js)

Opinionated starter for a modern, minimal personal site built with the Next.js App Router, Tailwind CSS v4, and a first-class dark mode experience powered by `next-themes`.

### Features
- Aurora hero with animated gradients, marquee capability pills, and interactive spotlight cards
- Structured sections covering hero, stacks, projects, research, experience, certifications, achievements, interests, lab experiments, and contact
- Placeholder copy in `data/profile.ts` so you can drop in real content quickly
- Dark / light toggle with persisted preference via `next-themes`
- Meaningful motion powered by Framer Motion (section reveals, card hover cues)
- Soft gradients, glassmorphic panels, and responsive layout tuned for both mobile and desktop
- TypeScript, ESLint, and Tailwind already configured

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to preview your site.

## Customize the Content

Most content lives in `data/profile.ts`. Update hero text, highlights, stacks, projects, experience entries, research studies, certifications, achievements, and interests there. CTA links, email, and social handles are also defined in this file. Lab concepts, process notes, and marquee phrases are defined near the top of `app/page.tsx` so you can tailor them to your voice.

Fine-tune layout or component behavior inside `app/page.tsx`, and global styling tokens inside `app/globals.css`.

## Available Scripts

- `npm run dev` – launch local dev server with hot reload
- `npm run lint` – run ESLint using the Next.js config
- `npm run build` – generate the production bundle
- `npm run start` – serve the production build locally

## Deployment

Deploy on any platform that supports Next.js (Vercel, Netlify, self-hosted Node). Run `npm run build` first, then deploy the `.next` output according to your provider’s instructions.
