# Initia AI Yield Sentinel (Vite + React + TypeScript)

This repository is a **Vite runtime** for the Initia AI Yield Sentinel app.

## Hackathon fallback architecture (important)

- **Hackathon target rollup (display/compliance):** `ai-yield-sentinel-1`
- **Live demo execution network (actual tx runtime):** `initiation-2` (Initia Testnet)

The custom rollup was initialized for submission compliance, but it is **not executable inside Codespaces** due to environment/systemd limitations. The live demo therefore runs on public Initia testnet to provide an honest functional proof (wallet flow, auto-signing controls, tx execution).

## Runtime network values

Execution network values used by the app:

- Chain ID: `initiation-2`
- Network name: `Initia Testnet`
- RPC: `https://rpc.testnet.initia.xyz`
- REST/LCD: `https://rest.testnet.initia.xyz`
- Native currency: `INIT` (decimals `6`, denom `uinit`)
- Bech32 prefix: `init`

## Included features

- InterwovenKit wallet connect/open wallet/open bridge flow.
- Wagmi v2 root provider/config with required chain transport for InterwovenKit compatibility.
- Sentinel score/confidence/reasons UI.
- Execute transaction flow using `requestTxBlock` and status feedback.
- Runtime diagnostics panel showing both hackathon target and live execution chain.
- Runtime failure cards (error boundary + in-app provider error card).

## Local development

```bash
npm install --legacy-peer-deps
npm run dev
```

Then open the local Vite URL (usually `http://localhost:5173`).

## Verification commands

```bash
npm install --legacy-peer-deps
npm run lint
npm run build
npm run preview
```

## Runtime diagnostics expectations

On healthy load, Diagnostics should show:

- Provider initialization: `ready`
- Wallet connected: `yes/no`
- Target Rollup (Hackathon): `ai-yield-sentinel-1`
- Execution Network (Live Demo): `initiation-2`
- Last tx status: starts at `Idle`

If runtime crashes during startup, the app shows a red **Runtime Initialization Failed** card instead of a blank page.

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
→ `WagmiProvider` (wagmi `createConfig` with `initiaPrivyWalletConnector`, `mainnet`, `http()` transport)
→ `InterwovenKitProvider` (TESTNET config overridden with `defaultChainId: initiation-2`)
→ `App`

## Known limitations

- Transaction success depends on wallet connectivity and Initia testnet availability.
- `requestTxBlock` may return no hash in some wallet/provider edge cases; UI still reports status.
- Bundle size is large due to wallet ecosystem dependencies; Vite build can warn about chunk size.
