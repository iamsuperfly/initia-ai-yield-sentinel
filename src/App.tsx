import { truncate } from '@initia/utils';
import { useMemo, useState } from 'react';
import { InterwovenKit, useInterwovenKit } from '@initia/interwovenkit-react';
import { evaluateSentinel, type MarketSnapshot } from './sentinel';

const CHAIN_ID = 'ai-yield-sentinel-1';

const initialState: MarketSnapshot = {
  apr: 68,
  volatility: 32,
  liquidityDepth: 72,
  bridgeSpreadBps: 18,
  momentum: 64,
};

export function App() {
  const {
    address,
    username,
    isConnected,
    openConnect,
    openWallet,
    requestTxBlock,
    autoSign,
    openBridge,
  } = useInterwovenKit();

  const [snapshot, setSnapshot] = useState<MarketSnapshot>(initialState);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Idle');
  const [error, setError] = useState<string | null>(null);

  const signal = useMemo(() => evaluateSentinel(snapshot), [snapshot]);

  const update = (key: keyof MarketSnapshot, value: number) => {
    setSnapshot((prev) => ({ ...prev, [key]: value }));
  };

  const enableAutoSigning = async () => {
    setError(null);
    setStatus('Enabling auto-signing...');
    try {
      await autoSign.enable(CHAIN_ID);
      setStatus('Auto-signing enabled');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enable auto-signing');
      setStatus('Auto-signing unavailable');
    }
  };

  const disableAutoSigning = async () => {
    setError(null);
    setStatus('Disabling auto-signing...');
    try {
      await autoSign.disable(CHAIN_ID);
      setStatus('Auto-signing disabled');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disable auto-signing');
      setStatus('Auto-signing disable failed');
    }
  };

  const executeSentinel = async () => {
    if (!address) {
      setError('Connect a wallet first');
      return;
    }

    setError(null);
    setTxHash(null);
    setStatus('Submitting transaction...');

    try {
      const result = await requestTxBlock({
        chainId: CHAIN_ID,
        messages: [
          {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: {
              fromAddress: address,
              toAddress: address,
              amount: [{ amount: '1000', denom: 'uinit' }],
            },
          },
        ],
      });

      setTxHash(result?.transactionHash ?? null);
      setStatus('Execution confirmed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Execution failed');
      setStatus('Execution failed');
    }
  };

  const autoSignEnabled = autoSign.isEnabledByChain?.[CHAIN_ID] ?? false;

  return (
    <main className="container">
      <header className="card">
        <h1>Initia AI Yield Sentinel</h1>
        <p>
          AI yield signal dashboard with InterwovenKit wallet flow and execution path. This MVP
          is tuned for Initia hackathon requirements: real wallet, real transaction request, and
          auto-signing UX controls.
        </p>
      </header>

      <section className="card">
        <h2>Wallet & Profile</h2>
        {!isConnected ? (
          <button onClick={openConnect}>Connect Wallet</button>
        ) : (
          <div className="walletRow">
            <button onClick={openWallet}>{username ? truncate(username) : truncate(address)}</button>
            <button className="secondary" onClick={() => openBridge()}>
              Open Bridge
            </button>
          </div>
        )}
      </section>

      <section className="card">
        <h2>Auto-Signing (Native Feature)</h2>
        <p>Chain: {CHAIN_ID}</p>
        <p>Status: {autoSignEnabled ? 'Enabled' : 'Disabled'}</p>
        <div className="walletRow">
          <button onClick={enableAutoSigning} disabled={!isConnected || autoSign.isLoading}>
            Enable Auto-Signing
          </button>
          <button
            className="secondary"
            onClick={disableAutoSigning}
            disabled={!isConnected || autoSign.isLoading}
          >
            Disable Auto-Signing
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Sentinel Inputs</h2>
        {(Object.keys(snapshot) as Array<keyof MarketSnapshot>).map((key) => (
          <label key={key}>
            <span>{key}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={snapshot[key]}
              onChange={(e) => update(key, Number(e.target.value))}
            />
            <strong>{snapshot[key]}</strong>
          </label>
        ))}
      </section>

      <section className="card">
        <h2>Signal Output</h2>
        <p>Signal score: {signal.score.toFixed(1)}</p>
        <p>Confidence: {signal.confidence.toFixed(1)}%</p>
        <p>Recommendation: {signal.action}</p>
        <ul>
          {signal.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Execute Sentinel</h2>
        <button disabled={!isConnected || signal.action !== 'EXECUTE'} onClick={executeSentinel}>
          Execute Sentinel Strategy
        </button>
        <p>Status: {status}</p>
        {txHash && <p className="success">Transaction hash: {txHash}</p>}
        {error && <p className="error">Error: {error}</p>}
      </section>

      <InterwovenKit />
    </main>
  );
}
