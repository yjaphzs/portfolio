![Github_Banner](https://github.com/user-attachments/assets/6edce962-d9b2-45d1-a9f8-c6f3a06dc566)

# JPB - Portfolio (2025)

This is my personal **portfolio website** built using **Next.js (TypeScript)**. It showcases my projects, skills, and experiences as a web developer.

Every version of the site is still online — the retro TV in the corner switches between them.

## 🚀 Tech Stack

- **Next.js** (App Router, TypeScript)
- **React** 19
- **Tailwind CSS v4** + **CSS/SCSS**
- **Firebase Hosting** (for deployment), Realtime Database + Firestore for the visitor counters

Built as a **static export** (`output: "export"`) — `next build` emits one prerendered
HTML file per route, so there is no server at runtime and every page ships its own
title, description, canonical URL and Open Graph card.

## 📦 Getting Started

To run the project locally:

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # static export into out/
npm run typecheck
npm run lint
npm run serve        # serve the export through the Firebase emulator
```

Firebase is optional — copy `.env.example` to `.env` and fill it in to enable the
presence counter. Leave it blank and the site runs fine without it.

## 🔗 Live Demo
You can view the live portfolio here:
https://yjaphzs.xyz

## 📸 Demo & Screenshot
- **Demo**
![Animation](https://github.com/user-attachments/assets/78d070e1-8b51-4711-a365-09aa29e862c6)

- **Screenshot**
![screenshot-2025-06-26-10-30-17](https://github.com/user-attachments/assets/d156fd43-7e8f-49ed-b065-d4d19429ab37)
