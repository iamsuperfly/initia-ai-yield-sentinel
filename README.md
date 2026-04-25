# Initia AI Yield Sentinel (Vite + React + TypeScript)

This repository is a **Vite runtime** for the Initia AI Yield Sentinel app.
It includes:

- InterwovenKit wallet connect/open wallet/open bridge flow (wrapped with React Query root provider).
- Sentinel score/confidence/reasons UI.
- Execute transaction flow using `requestTxBlock` and status feedback.
- Runtime diagnostics panel (provider state, wallet state, chain ID, last tx status).
- Visible runtime failure cards (error boundary + in-app provider error card).

## Stack

- Vite
- React 19 + TypeScript
- `@initia/interwovenkit-react`
- `@tanstack/react-query`

## Local development

```bash
npm install --legacy-peer-deps
npm run dev
```

Then open the local Vite URL (usually `http://localhost:5173`).

## Production build preview

```bash
npm run build
npm run preview
```

Open the preview URL from terminal output (usually `http://localhost:4173`).

## Vercel deployment settings

Use these exact settings:

- **Framework Preset:** `Vite`
- **Install Command:** `npm install --legacy-peer-deps`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## Provider tree (runtime root)

`React.StrictMode`
→ `RootErrorBoundary`
→ `QueryClientProvider`
→ `InterwovenKitProvider`
→ `App`

This ordering is required so InterwovenKit hooks/components can access the React Query context in dev, preview, and Vercel production runtime.

## Runtime expectations

On a healthy load you should see:

1. Header card: **Initia AI Yield Sentinel**
2. Diagnostics card with:
   - Provider initialization: `ready`
   - Wallet connected: `yes/no`
   - Chain ID in use: `ai-yield-sentinel-1`
   - Last tx status: starts at `Idle`
3. Wallet, auto-signing, sentinel input/output, and execute sections.

If runtime crashes during startup, the app shows a red **Runtime Initialization Failed** card instead of a blank page.

## Repo hygiene notes

- This repo now keeps active frontend runtime files for Vite only.
- `official-examples/` and `relayer/` are treated as non-runtime reference folders and ignored by git.

## Known limitations

- Transaction success depends on wallet connectivity and chain availability.
- `requestTxBlock` may return no hash in some wallet/provider edge cases; UI still reports status.
- Bundle size is large due to wallet ecosystem dependencies; Vite build can warn about chunk size.

