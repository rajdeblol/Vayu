'use client';

import React, { useState } from 'react';
import { Send, Zap, TrendingUp, Shield, Clock } from 'lucide-react';
import { useAccount } from 'wagmi';

interface Message {
  id: string;
  type: 'user' | 'aku';
  content: string;
  timestamp: Date;
  status?: 'pending' | 'success' | 'error';
}

const EXAMPLE_PROMPTS = [
  '🚀 Deploy 1000 USDC into DeFi yield strategy',
  '📊 Analyze current market conditions on Arc',
  '⚡ Swap 500 USDC for ETH with 0.5% slippage',
  '🔒 Lock my funds in strategy vault for 30 days',
  '💰 Show portfolio breakdown and yield',
];

export function AkuComponent() {
  const { isConnected, address } = useAccount();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'aku',
      content: "Hey! I'm Aku. I can help you trade, deploy strategies, and manage your portfolio. What's on your mind? 🌬️",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate Aku processing
    setTimeout(() => {
      const responses = [
        "I'm analyzing the market and preparing your transaction. This will execute a swap of your tokens with optimal slippage protection.",
        "Processing your strategy deployment... I'm calculating the best APY routes across Arc's liquidity pools.",
        "Checking your wallet balance and creating a session permission for this transaction. You maintain full control.",
        'Got it! I\'m queuing this operation with 2/3 security checks passed. Ready to execute whenever you confirm.',
        'Smart move! Based on current Arc network conditions, this is a favorable time to execute. Setting up your vault deposit now.',
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];

      const akuMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'aku',
        content: response,
        timestamp: new Date(),
        status: 'success',
      };

      setMessages((prev) => [...prev, akuMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 h-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Aku Trading Agent</h1>
        <p className="text-[#666]">Your AI-powered autonomous trading assistant on Arc</p>
      </div>

      {/* Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Chat Area */}
        <div className="lg:col-span-2 flex flex-col bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-[#60a5fa] text-white rounded-br-none'
                      : 'bg-[#1a1a1a] text-[#ddd] rounded-bl-none border border-[#333]'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  {msg.status === 'success' && msg.type === 'aku' && (
                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      ✓ Transaction ready
                    </p>
                  )}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] text-[#ddd] px-4 py-3 rounded-lg rounded-bl-none border border-[#333]">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#60a5fa] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#60a5fa] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-[#60a5fa] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-[#1a1a1a] p-4 bg-[#050505]">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tell Aku what to do..."
                disabled={!isConnected || isProcessing}
                className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#60a5fa] disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!isConnected || !input.trim() || isProcessing}
                className="bg-[#60a5fa] hover:bg-[#3b82f6] disabled:bg-[#1a1a1a] disabled:text-[#666] text-white px-4 py-3 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {!isConnected && (
              <p className="text-xs text-yellow-300 mt-2">
                💡 Connect your wallet to start using Aku
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#60a5fa]" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              {EXAMPLE_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(prompt);
                  }}
                  disabled={!isConnected}
                  className="w-full text-left px-3 py-2 rounded-lg bg-[#050505] border border-[#1a1a1a] hover:border-[#333] transition-colors text-sm text-[#ddd] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Smart Routing</p>
                  <p className="text-xs text-[#666]">Best execution paths on Arc</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Non-Custodial</p>
                  <p className="text-xs text-[#666]">You control your assets</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">24/7 Available</p>
                  <p className="text-xs text-[#666]">Trade anytime, anywhere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
