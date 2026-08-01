'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Settings, ArrowUpDown, Zap } from 'lucide-react';
import { useAccount } from 'wagmi';

interface Token {
  symbol: string;
  name: string;
  icon: string;
  address: string;
  decimals: number;
  price: number;
}

const MOCK_TOKENS: Token[] = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '💵',
    address: '0x3600000000000000000000000000000000000000',
    decimals: 6,
    price: 1.0,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: '⟠',
    address: '0x0000000000000000000000000000000000000001',
    decimals: 18,
    price: 2500,
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    icon: '₮',
    address: '0x0000000000000000000000000000000000000002',
    decimals: 6,
    price: 1.0,
  },
  {
    symbol: 'DAI',
    name: 'Dai',
    icon: '◈',
    address: '0x0000000000000000000000000000000000000003',
    decimals: 18,
    price: 1.0,
  },
];

export function SwapComponent() {
  const { isConnected, address } = useAccount();
  const [fromToken, setFromToken] = useState<Token>(MOCK_TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(MOCK_TOKENS[1]);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapStatus, setSwapStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  // Calculate exchange rate
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const rate = (parseFloat(fromAmount) * fromToken.price) / toToken.price;
      setToAmount(rate.toFixed(toToken.decimals));
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
    setToAmount('');
  };

  const handleSwap = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) === 0) {
      alert('Please enter an amount');
      return;
    }

    setIsSwapping(true);
    setSwapStatus('pending');

    // Simulate swap transaction
    setTimeout(() => {
      setSwapStatus('success');
      setFromAmount('');
      setToAmount('');
      setTimeout(() => {
        setSwapStatus('idle');
        setIsSwapping(false);
      }, 2000);
    }, 2000);
  };

  const priceImpact = ((slippage * parseFloat(toAmount || '0')) / 100).toFixed(toToken.decimals);
  const minimumReceived = (
    parseFloat(toAmount || '0') - parseFloat(priceImpact)
  ).toFixed(toToken.decimals);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Swap</h1>
        <p className="text-[#666]">Trade tokens instantly on Arc</p>
      </div>

      {/* Main Swap Card */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 max-w-2xl">
        {/* From Token Section */}
        <div className="space-y-3 mb-4">
          <label className="text-sm text-[#999] font-medium">You send</label>
          <div className="space-y-3">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#050505] border border-[#1a1a1a] rounded-lg px-4 py-3 text-2xl font-semibold text-white placeholder-[#444] focus:outline-none focus:border-[#60a5fa]"
            />
            <div className="relative">
              <button
                onClick={() => {
                  setShowFromTokens(!showFromTokens);
                  setShowToTokens(false);
                }}
                className="w-full bg-[#050505] border border-[#1a1a1a] rounded-lg px-4 py-3 flex items-center justify-between hover:border-[#333] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{fromToken.icon}</span>
                  <div className="text-left">
                    <p className="font-semibold">{fromToken.symbol}</p>
                    <p className="text-xs text-[#666]">{fromToken.name}</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-[#666]" />
              </button>

              {/* From Token Dropdown */}
              {showFromTokens && (
                <div className="absolute top-full mt-2 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg shadow-xl z-10">
                  {MOCK_TOKENS.filter((t) => t.symbol !== toToken.symbol).map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setFromToken(token);
                        setShowFromTokens(false);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#111] transition-colors text-left border-b border-[#1a1a1a] last:border-b-0"
                    >
                      <span className="text-2xl">{token.icon}</span>
                      <div>
                        <p className="font-semibold">{token.symbol}</p>
                        <p className="text-xs text-[#666]">${token.price.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-3 relative z-20">
          <button
            onClick={handleSwapTokens}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-full p-3 hover:bg-[#111] transition-colors"
          >
            <ArrowUpDown className="w-5 h-5 text-[#60a5fa]" />
          </button>
        </div>

        {/* To Token Section */}
        <div className="space-y-3 mb-6 pt-4">
          <label className="text-sm text-[#999] font-medium">You receive</label>
          <div className="space-y-3">
            <input
              type="number"
              value={toAmount}
              readOnly
              placeholder="0.00"
              className="w-full bg-[#050505] border border-[#1a1a1a] rounded-lg px-4 py-3 text-2xl font-semibold text-white placeholder-[#444] cursor-not-allowed opacity-60"
            />
            <div className="relative">
              <button
                onClick={() => {
                  setShowToTokens(!showToTokens);
                  setShowFromTokens(false);
                }}
                className="w-full bg-[#050505] border border-[#1a1a1a] rounded-lg px-4 py-3 flex items-center justify-between hover:border-[#333] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{toToken.icon}</span>
                  <div className="text-left">
                    <p className="font-semibold">{toToken.symbol}</p>
                    <p className="text-xs text-[#666]">{toToken.name}</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-[#666]" />
              </button>

              {/* To Token Dropdown */}
              {showToTokens && (
                <div className="absolute top-full mt-2 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg shadow-xl z-10">
                  {MOCK_TOKENS.filter((t) => t.symbol !== fromToken.symbol).map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setToToken(token);
                        setShowToTokens(false);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#111] transition-colors text-left border-b border-[#1a1a1a] last:border-b-0"
                    >
                      <span className="text-2xl">{token.icon}</span>
                      <div>
                        <p className="font-semibold">{token.symbol}</p>
                        <p className="text-xs text-[#666]">${token.price.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        {fromAmount && (
          <div className="space-y-2 mb-6 p-4 bg-[#050505] rounded-lg border border-[#1a1a1a]">
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Exchange Rate</span>
              <span className="text-white font-medium">
                1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(4)} {toToken.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Minimum Received</span>
              <span className="text-white font-medium">{minimumReceived} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Price Impact</span>
              <span className="text-[#f97316]">{slippage}%</span>
            </div>
          </div>
        )}

        {/* Slippage Settings */}
        <div className="mb-6 p-4 bg-[#050505] rounded-lg border border-[#1a1a1a]">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm text-[#999] font-medium flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Slippage Tolerance
            </label>
            <span className="text-white font-medium">{slippage}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value))}
            className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#60a5fa]"
          />
          <p className="text-xs text-[#666] mt-2">
            Your transaction will be reverted if there is a worse rate by more than this %
          </p>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!isConnected || !fromAmount || isSwapping}
          className={`w-full py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
            !isConnected
              ? 'bg-[#1a1a1a] text-[#666] cursor-not-allowed'
              : isSwapping
                ? 'bg-[#60a5fa] text-white opacity-50 cursor-not-allowed'
                : swapStatus === 'success'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-black hover:bg-[#f1f1f1]'
          }`}
        >
          {!isConnected ? (
            '⚠️ Connect Wallet to Swap'
          ) : isSwapping ? (
            <>
              <Zap className="w-5 h-5 animate-pulse" />
              Swapping...
            </>
          ) : swapStatus === 'success' ? (
            '✓ Swap Successful!'
          ) : (
            <>
              <ArrowUpDown className="w-5 h-5" />
              Swap {fromToken.symbol} for {toToken.symbol}
            </>
          )}
        </button>

        {/* Warning */}
        {!isConnected && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-300 text-sm">
            💡 Please connect your wallet to start trading
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4 max-w-2xl">
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
          <p className="text-xs text-[#666] mb-1">Network</p>
          <p className="font-semibold">Arc Testnet</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
          <p className="text-xs text-[#666] mb-1">Gas Fees</p>
          <p className="font-semibold">Pay in USDC</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
          <p className="text-xs text-[#666] mb-1">Status</p>
          <p className="font-semibold text-green-400">Live</p>
        </div>
      </div>
    </div>
  );
}
