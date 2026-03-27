# DarkWave Studios

The ecosystem IDE and developer portal. Hosts the Lume language playground, Signal Chat integration, and app cataloging for the Trust Layer ecosystem.

**Live:** [darkwavestudios.io](https://darkwavestudios.io)

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite 7 (Radix UI) |
| Backend | Express + TypeScript |
| Database | PostgreSQL (Drizzle ORM) |
| Chat | Signal Chat WebSocket integration |
| Auth | Trust Layer SSO (JWT) |
| Deployment | Render (Ohio) |

## Structure

```
darkwavestudios/
├── server/
│   ├── routes.ts       # 3,892 lines — API routes
│   └── chat-auth.ts    # JWT auth for Signal Chat
├── client/             # React SPA
├── shared/             # Drizzle schema
└── render.yaml
```

## Development

```bash
npm install
npm run dev
npm run db:push
```
