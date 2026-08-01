'use client';

import { useConnect } from 'wagmi';
import { X } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectors, connect, isPending } = useConnect();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl max-w-sm w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1a1a1a] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {connectors.length > 0 ? (
            connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  connect({ connector });
                  onClose();
                }}
                disabled={isPending}
                className="w-full px-4 py-3 rounded-lg bg-white text-black font-medium hover:bg-[#f1f1f1] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? 'Connecting...' : `Connect ${connector.name}`}
              </button>
            ))
          ) : (
            <div className="text-center py-8 text-[#666]">
              <p className="font-medium mb-2">No Wallet Detected</p>
              <p className="text-sm mb-4">
                Please install MetaMask, Rabby, or another Web3 wallet extension
              </p>
              <a
                href="https://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#60a5fa] hover:underline text-sm"
              >
                Install MetaMask →
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-[#1a1a1a]/50 border border-[#1a1a1a]">
          <p className="text-xs text-[#666] leading-relaxed">
            💡 <span className="text-[#999]">Make sure you're on Arc Testnet (Chain ID: 5042002)</span>
          </p>
        </div>
      </div>
    </div>
  );
}
