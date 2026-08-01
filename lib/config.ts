import { defineChain, http } from 'viem';
import { createConfig } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

export const arc = defineChain({
  id: 5042002,
  name: 'Arc Testnet',
  nativeCurrency: {
    decimals: 6,
    name: 'USDC',
    symbol: 'USDC',
  },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.arc.network'] },
  },
  blockExplorers: {
    default: { name: 'Arc Explorer', url: 'https://testnet.arcscan.net' },
  },
});

export const config = createConfig({
  chains: [arc],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '',
    }),
  ],
  transports: {
    [arc.id]: http(),
  },
});
