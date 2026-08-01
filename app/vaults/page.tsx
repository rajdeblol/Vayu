export default function VaultsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Strategy Vaults</h1>
        <p className="text-[#666]">Deposit and let Aku manage your strategies</p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-4xl">
        {[
          { name: 'Yield Farming', apy: '12.5%', tvl: '$2.3M' },
          { name: 'Arbitrage', apy: '8.2%', tvl: '$1.8M' },
          { name: 'Market Making', apy: '15.3%', tvl: '$3.1M' },
        ].map((vault) => (
          <div key={vault.name} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
            <h3 className="font-semibold mb-4">{vault.name}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[#666] mb-1">APY</p>
                <p className="text-2xl font-bold text-green-400">{vault.apy}</p>
              </div>
              <div>
                <p className="text-sm text-[#666] mb-1">TVL</p>
                <p className="text-lg font-semibold">{vault.tvl}</p>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-[#f1f1f1] transition-colors">
                Deposit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
