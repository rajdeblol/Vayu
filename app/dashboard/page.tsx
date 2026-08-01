'use client';

import { useAccount } from 'wagmi';
import { TrendingUp, Wallet, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-12 text-center">
          <p className="text-[#666]">Connect your wallet to view your portfolio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-[#666]">Your portfolio on Arc</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#666] font-medium">Total Balance</p>
            <Wallet className="w-5 h-5 text-[#60a5fa]" />
          </div>
          <p className="text-3xl font-bold">$12,450.50</p>
          <p className="text-sm text-green-400 mt-2">+5.2% this week</p>
        </div>

        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#666] font-medium">Yield Earned</p>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">$243.80</p>
          <p className="text-sm text-green-400 mt-2">+12% this month</p>
        </div>

        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#666] font-medium">Active Positions</p>
            <DollarSign className="w-5 h-5 text-[#f97316]" />
          </div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-[#666] mt-2">Swap, Vault, Staking</p>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#1a1a1a]">
          <h3 className="text-lg font-semibold">Your Holdings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="px-6 py-3 text-left text-sm font-medium text-[#999]">Token</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#999]">Balance</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#999]">Value</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#999]">% of Portfolio</th>
              </tr>
            </thead>
            <tbody>
              {[
                { token: 'USDC', balance: '5,000', value: '$5,000', percent: '40.1%' },
                { token: 'ETH', balance: '2.5', value: '$6,250', percent: '50.2%' },
                { token: 'DAI', balance: '1,200', value: '$1,200.50', percent: '9.7%' },
              ].map((holding) => (
                <tr key={holding.token} className="border-b border-[#1a1a1a] hover:bg-[#050505] transition-colors">
                  <td className="px-6 py-4 font-semibold">{holding.token}</td>
                  <td className="px-6 py-4 text-[#ddd]">{holding.balance}</td>
                  <td className="px-6 py-4 text-[#ddd]">{holding.value}</td>
                  <td className="px-6 py-4 text-[#ddd]">{holding.percent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
