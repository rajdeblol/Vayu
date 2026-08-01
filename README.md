# Vayu

**Ride the wind of the market.**

Vayu is an autonomous trading platform built on **Arc** (Circle's stablecoin-native Layer 1).  
It combines a beautiful atmospheric interface with an AI agent called **Aku** that can understand natural language strategies and execute them on-chain.

---

## Features

- **Aku** – Conversational AI that turns natural language into on-chain strategies
- **Strategy Vaults** – Deposit USDC and let Aku manage strategies within your guardrails
- **Non-custodial** – You stay in full control of your funds
- **Session Permissions** – Grant limited rights to Aku without giving full access
- **Built for Arc** – Native USDC gas, sub-second finality, and agentic design
- Atmospheric dark UI with live wind visualizations

---

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Wallet**: wagmi + viem
- **Smart Contracts**: Solidity + Foundry
- **Chain**: Arc Testnet (Chain ID `5042002`)

---

## Deployed Contracts (Arc Testnet)

| Contract            | Address                                      |
|---------------------|----------------------------------------------|
| PermissionManager   | `0x080519a7D9dCdB83999644Daa205dDE2D92e2cb2` |
| StrategyVault       | `0xc9aD3349054B22f5fa8F33fCf3B3ea446fE9BF4F` |
| VayuRouter          | `0x3D148e412985a69A41F77CB81C4f15C071dCce4E` |
| USDC                | `0x3600000000000000000000000000000000000000` |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rajdeblol/Vayu.git
cd Vayu
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Smart Contracts

The contracts are located in `packages/contracts`.

```bash
cd packages/contracts
forge build
forge test
```

---

## License

MIT
