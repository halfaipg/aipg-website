# AI Power Grid — Website

The marketing site for [AI Power Grid](https://aipowergrid.io): free AI for
everyone, funded by paid usage, running on a decentralized GPU network.

Built with Next.js (App Router) + Tailwind, with RainbowKit/wagmi for the
wallet-connected staking interface. Deployed on Vercel.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Next.js lint |
| `npm run test:e2e` | Playwright smoke tests (loads /, /staking; fails on console errors) |

## Structure

- `app/` — routes (App Router). Home, `/staking` (withdrawal-only; the staking
  program has wound down), `/about`, `/wallet`.
- `components/` — page sections (`Hero`, `Problem`, `RunNode`, `Infrastructure`,
  `StakingInterface`, etc.).
- `tests/e2e/` — Playwright smoke tests.

## Docs

Developer and operator documentation lives in
[aipg-documentation](https://github.com/AIPowerGrid/aipg-documentation) and is
served at [aipowergrid.io/docs](https://aipowergrid.io/docs) via a Vercel
rewrite (see `vercel.json`).

## Related repos

- [system-core](https://github.com/AIPowerGrid/system-core) — the Grid API
- [comfy-bridge](https://github.com/AIPowerGrid/comfy-bridge) — image/video worker
- [grid-inference-worker](https://github.com/AIPowerGrid/grid-inference-worker) — LLM worker
- [aipg-smart-contracts](https://github.com/AIPowerGrid/aipg-smart-contracts) — on-chain (Base)
