# Vayu Smart Contracts

Core contracts for the Vayu autonomous trading platform on Arc.

## Contracts

- **StrategyVault.sol** — Non-custodial vault with guardrails. Users deposit USDC and grant Aku limited execution rights.
- **SessionKey.sol** — Permission system allowing time-bound, value-limited agent access.

## Setup

```bash
forge install
forge build
forge test
```

## Deployment (Arc Testnet)

```bash
forge create src/StrategyVault.sol:StrategyVault \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $PRIVATE_KEY \
  --constructor-args $USDC_ADDRESS
```