export const HACKATHON_TARGET_ROLLUP_CHAIN_ID = 'ai-yield-sentinel-1';

export const EXECUTION_CHAIN = {
  chainId: 'initiation-2',
  networkName: 'Initia Testnet',
  rpcUrl: 'https://rpc.testnet.initia.xyz',
  restUrl: 'https://rest.testnet.initia.xyz',
  nativeCurrency: {
    symbol: 'INIT',
    decimals: 6,
    denom: 'uinit',
  },
  bech32Prefix: 'init',
} as const;
