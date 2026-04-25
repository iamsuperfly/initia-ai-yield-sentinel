export type MarketSnapshot = {
  apr: number;
  volatility: number;
  liquidityDepth: number;
  bridgeSpreadBps: number;
  momentum: number;
};

export type SentinelSignal = {
  score: number;
  confidence: number;
  action: 'EXECUTE' | 'WAIT';
  reasons: string[];
};

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

export function evaluateSentinel(snapshot: MarketSnapshot): SentinelSignal {
  const score = clamp(
    snapshot.apr * 0.45 +
      snapshot.momentum * 0.2 +
      snapshot.liquidityDepth * 0.2 -
      snapshot.volatility * 0.1 -
      snapshot.bridgeSpreadBps * 0.05
  );

  const confidence = clamp(
    65 +
      (snapshot.liquidityDepth - snapshot.volatility) * 0.2 +
      snapshot.momentum * 0.1 -
      snapshot.bridgeSpreadBps * 0.05
  );

  const reasons = [
    `APR contribution: ${snapshot.apr.toFixed(1)} × 0.45`,
    `Momentum contribution: ${snapshot.momentum.toFixed(1)} × 0.20`,
    `Risk penalties from volatility ${snapshot.volatility.toFixed(1)} and bridge spread ${snapshot.bridgeSpreadBps.toFixed(1)}`,
  ];

  return {
    score,
    confidence,
    action: score >= 55 && confidence >= 60 ? 'EXECUTE' : 'WAIT',
    reasons,
  };
}
