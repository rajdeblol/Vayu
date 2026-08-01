'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-5xl font-bold mb-2">Ride the wind of the market</h1>
          <p className="text-xl text-[#999]">Autonomous trading powered by Aku on Arc</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <Link
            href="/swap"
            className="p-6 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-all group"
          >
            <div className="text-2xl mb-2">💱</div>
            <h3 className="font-semibold mb-1 group-hover:text-[#60a5fa] transition-colors">Swap</h3>
            <p className="text-sm text-[#666]">Trade on Arc</p>
          </Link>

          <Link
            href="/aku"
            className="p-6 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-all group"
          >
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold mb-1 group-hover:text-[#60a5fa] transition-colors">Aku</h3>
            <p className="text-sm text-[#666]">AI Trading Agent</p>
          </Link>

          <Link
            href="/vaults"
            className="p-6 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-all group"
          >
            <div className="text-2xl mb-2">🏦</div>
            <h3 className="font-semibold mb-1 group-hover:text-[#60a5fa] transition-colors">Vaults</h3>
            <p className="text-sm text-[#666]">Strategy Vaults</p>
          </Link>

          <Link
            href="/dashboard"
            className="p-6 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-all group"
          >
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold mb-1 group-hover:text-[#60a5fa] transition-colors">Dashboard</h3>
            <p className="text-sm text-[#666]">Your Portfolio</p>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-6 max-w-3xl">
        <div className="space-y-2">
          <div className="text-[#60a5fa] font-semibold">Non-Custodial</div>
          <p className="text-sm text-[#666]">You control your funds at all times</p>
        </div>
        <div className="space-y-2">
          <div className="text-[#60a5fa] font-semibold">Native USDC</div>
          <p className="text-sm text-[#666]">Pay gas in USDC on Arc</p>
        </div>
        <div className="space-y-2">
          <div className="text-[#60a5fa] font-semibold">AI Powered</div>
          <p className="text-sm text-[#666]">Aku understands your strategy</p>
        </div>
      </div>
    </div>
  );
}
