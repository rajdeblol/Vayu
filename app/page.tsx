'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center p-4">
      {/* Wind animation background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          <defs>
            <filter id="turbulence">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" seed="2" />
              <feDisplacementMap in="SourceGraphic" scale="80" />
            </filter>
          </defs>
          <path d="M0,300 Q300,250 600,300 T1200,300" stroke="rgba(59,130,246,0.3)" strokeWidth="2" fill="none" filter="url(#turbulence)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🌬️</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            Vayu
          </h1>
          <p className="text-slate-400 text-lg">Ride the wind of the market</p>
        </div>

        {/* Wallet Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 backdrop-blur-sm">
          {isConnected ? (
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-1">Connected Wallet</p>
                <p className="text-lg font-mono text-green-400">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-blue-300">✓ Arc Testnet Connected</p>
                <p className="text-xs text-blue-300/60 mt-1">Chain ID: 5042002</p>
              </div>

              <button
                onClick={() => disconnect()}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Disconnect Wallet
              </button>

              <div className="grid grid-cols-2 gap-3 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Non-custodial</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Session safe</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-300 text-center mb-6">
                Connect your wallet to start trading with Aku on Arc
              </p>

              {connectors.length > 0 ? (
                connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    disabled={isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    {isPending ? 'Connecting...' : `Connect ${connector.name}`}
                  </button>
                ))
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-yellow-300 text-sm">
                  <p className="font-semibold mb-2">⚠️ No Wallets Found</p>
                  <p className="text-xs">Install MetaMask, Rabby, or another Web3 wallet extension to continue.</p>
                </div>
              )}

              <p className="text-xs text-slate-500 text-center mt-4">
                Make sure you're connected to Arc Testnet (Chain ID: 5042002)
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>Powered by Arc • Aku • USDC</p>
        </div>
      </div>
    </div>
  );
}
