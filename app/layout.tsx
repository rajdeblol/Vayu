'use client';

import React, { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from '@/lib/config';
import { WalletModal } from '@/components/wallet/WalletModal';
import { Wind, LogOut, User } from 'lucide-react';
import { useAccount, useDisconnect } from 'wagmi';
import './globals.css';

const queryClient = new QueryClient();

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#050505]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wind className="w-6 h-6 text-[#60a5fa]" />
            <div className="font-semibold text-xl tracking-tight">Vayu</div>
            <div className="ml-2 text-[10px] px-2 py-px rounded bg-[#1a1a1a] text-[#555] font-mono">ARC</div>
          </div>
          <div className="flex items-center gap-4">
            {isConnected && address ? (
              <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 rounded-full bg-[#0a0a0a] border border-[#1a1a1a] text-sm font-mono flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  {address.slice(0, 6)}...{address.slice(-4)}
                </div>
                <button
                  onClick={() => disconnect()}
                  className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-full border border-[#1a1a1a] hover:bg-[#111] transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="px-6 py-2 rounded-full bg-white text-black font-medium text-sm hover:bg-[#f1f1f1] transition-all"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 border-t border-[#111]">
          <div className="flex items-center gap-8 text-sm h-12">
            <a href="/" className="hover:text-[#60a5fa] transition-colors font-medium">Home</a>
            <a href="/swap" className="hover:text-[#60a5fa] transition-colors">Swap</a>
            <a href="/aku" className="hover:text-[#60a5fa] transition-colors">Aku</a>
            <a href="/vaults" className="hover:text-[#60a5fa] transition-colors">Vaults</a>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-8">
        {children}
      </main>
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col bg-black text-white">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <AppLayout>{children}</AppLayout>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
