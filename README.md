# Initia AI Yield Sentinel

Initia AI Yield Sentinel is an AI-lite yield decision frontend with real InterwovenKit wallet integration, transaction execution, and auto-signing controls.

## What is implemented

- InterwovenKit provider wiring in app bootstrapping (`src/main.tsx`)
- Wallet connect/open wallet/open bridge actions in UI
- AI-lite signal engine with score, confidence, and explainable reasons
- Execution button that submits a real transaction request via `requestTxBlock`
- Auto-signing UX controls (`enable` / `disable`) through `autoSign`
- Submission metadata file at `.initia/submission.json`

## Local run

```bash
npm install --legacy-peer-deps
npm run dev
```

Open the Vite app URL shown by terminal (usually forwarded port 5173 or 3000 depending on environment).

## Build

```bash
npm run build
npm run preview
```

## Initia-specific runtime notes

- Configured chain ID: `ai-yield-sentinel-1`
- RPC URL currently set to: `http://localhost:26657`
- Gas station/deployer address used in submission metadata: `init17nn090yajatjq5njpw0850ncpqldewcrthfzc2`

If local rollup services are unavailable in Codespaces (systemd/linger limitation), capture transaction-hash proof from the wallet execution flow and include it in demo + submission notes.

## Submission checklist

- [x] InterwovenKit wallet integration
- [x] Native feature flow (auto-signing UX)
- [x] Real tx request path from Execute button
- [x] `.initia/submission.json` created
- [ ] Final `commit_sha` set in `.initia/submission.json`
- [ ] Final demo video URL set in `.initia/submission.json`
- [ ] Final proof links attached in README/demo
