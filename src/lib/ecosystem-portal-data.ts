export type EcosystemFeaturedProject = {
  name: string;
  description: string;
  url: string;
};

export type EcosystemResource = {
  label: string;
  url: string;
};

export const ecosystemFeaturedProjects: Record<
  string,
  EcosystemFeaturedProject[]
> = {
  base: [
    {
      name: "Aerodrome",
      description: "Leading DEX and liquidity hub on Base.",
      url: "https://aerodrome.finance",
    },
    {
      name: "Zora",
      description: "On-chain social and creator minting platform.",
      url: "https://zora.co",
    },
    {
      name: "Farcaster",
      description: "Decentralized social graph with Base-native apps.",
      url: "https://farcaster.xyz",
    },
  ],
  ethereum: [
    {
      name: "Uniswap",
      description: "AMM DEX and liquidity protocol.",
      url: "https://uniswap.org",
    },
    {
      name: "Aave",
      description: "Decentralized lending and borrowing market.",
      url: "https://aave.com",
    },
    {
      name: "OpenSea",
      description: "NFT marketplace and trading infrastructure.",
      url: "https://opensea.io",
    },
  ],
  solana: [
    {
      name: "Jupiter",
      description: "Swap aggregator and routing engine.",
      url: "https://jup.ag",
    },
    {
      name: "Magic Eden",
      description: "NFT marketplace and launchpad.",
      url: "https://magiceden.io",
    },
    {
      name: "Drift",
      description: "Perpetuals and DeFi trading protocol.",
      url: "https://drift.trade",
    },
  ],
  hyperliquid: [
    {
      name: "Hyperliquid App",
      description: "Native perps trading interface.",
      url: "https://app.hyperliquid.xyz",
    },
    {
      name: "Purrsec",
      description: "Block explorer and analytics for Hyperliquid.",
      url: "https://purrsec.com",
    },
    {
      name: "Hyperliquid Stats",
      description: "Protocol metrics and market dashboards.",
      url: "https://stats.hyperliquid.xyz",
    },
  ],
  arbitrum: [
    {
      name: "GMX",
      description: "Perpetuals and spot exchange on Arbitrum.",
      url: "https://gmx.io",
    },
    {
      name: "Camelot",
      description: "DEX and launchpad on Arbitrum.",
      url: "https://camelot.exchange",
    },
    {
      name: "Radiant",
      description: "Cross-chain lending protocol.",
      url: "https://radiant.capital",
    },
  ],
  optimism: [
    {
      name: "Velodrome",
      description: "Liquidity and trading hub on Optimism.",
      url: "https://velodrome.finance",
    },
    {
      name: "Synthetix",
      description: "Derivatives and perps liquidity protocol.",
      url: "https://synthetix.io",
    },
    {
      name: "Worldcoin",
      description: "Identity and wallet onboarding at scale.",
      url: "https://worldcoin.org",
    },
  ],
  avalanche: [
    {
      name: "Trader Joe",
      description: "DEX and DeFi hub on Avalanche.",
      url: "https://traderjoexyz.com",
    },
    {
      name: "Benqi",
      description: "Liquid staking and lending protocol.",
      url: "https://benqi.fi",
    },
    {
      name: "Platypus",
      description: "Stableswap and liquidity protocol.",
      url: "https://platypus.finance",
    },
  ],
  sui: [
    {
      name: "Cetus",
      description: "Concentrated liquidity DEX on Sui.",
      url: "https://cetus.zone",
    },
    {
      name: "Suilend",
      description: "Lending and borrowing on Sui.",
      url: "https://suilend.fi",
    },
    {
      name: "Navi Protocol",
      description: "Money market and lending infrastructure.",
      url: "https://naviprotocol.io",
    },
  ],
  aptos: [
    {
      name: "Thala",
      description: "Stablecoin and DeFi protocol on Aptos.",
      url: "https://thala.fi",
    },
    {
      name: "Aries Markets",
      description: "Lending and borrowing marketplace.",
      url: "https://ariesmarkets.xyz",
    },
    {
      name: "Pontem Network",
      description: "Wallet and developer tooling for Aptos.",
      url: "https://pontem.network",
    },
  ],
  polygon: [
    {
      name: "QuickSwap",
      description: "DEX and liquidity hub on Polygon.",
      url: "https://quickswap.exchange",
    },
    {
      name: "Polymarket",
      description: "Prediction markets on Polygon.",
      url: "https://polymarket.com",
    },
    {
      name: "Aave Polygon",
      description: "Lending market deployment on Polygon.",
      url: "https://aave.com",
    },
  ],
  berachain: [
    {
      name: "BEX",
      description: "Native exchange on Berachain.",
      url: "https://berachain.com",
    },
    {
      name: "Honey",
      description: "Stablecoin and liquidity layer.",
      url: "https://berachain.com",
    },
    {
      name: "BeraHub",
      description: "Community apps and ecosystem directory.",
      url: "https://berachain.com",
    },
  ],
  monad: [
    {
      name: "Monad Explorer",
      description: "Testnet explorer and network stats.",
      url: "https://monad.xyz",
    },
    {
      name: "Monad Devnet Tools",
      description: "Early developer tooling and RPC access.",
      url: "https://monad.xyz",
    },
    {
      name: "Ecosystem Directory",
      description: "Community-maintained project list.",
      url: "https://monad.xyz",
    },
  ],
};

export const ecosystemResources: Record<string, EcosystemResource[]> = {
  base: [
    { label: "Base Docs", url: "https://docs.base.org" },
    { label: "Build on Base", url: "https://base.org/build" },
    { label: "Base GitHub", url: "https://github.com/base-org" },
    { label: "Basescan", url: "https://basescan.org" },
  ],
  ethereum: [
    { label: "Ethereum Docs", url: "https://ethereum.org/developers" },
    { label: "Solidity Docs", url: "https://docs.soliditylang.org" },
    { label: "Etherscan", url: "https://etherscan.io" },
    { label: "Ethereum GitHub", url: "https://github.com/ethereum" },
  ],
  solana: [
    { label: "Solana Docs", url: "https://solana.com/docs" },
    { label: "Solana Cookbook", url: "https://solanacookbook.com" },
    { label: "Solana Explorer", url: "https://explorer.solana.com" },
    { label: "Solana GitHub", url: "https://github.com/solana-labs" },
  ],
  hyperliquid: [
    { label: "Hyperliquid Docs", url: "https://hyperliquid.gitbook.io" },
    { label: "API Reference", url: "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api" },
    { label: "Hyperliquid GitHub", url: "https://github.com/hyperliquid-dex" },
    { label: "Stats Dashboard", url: "https://stats.hyperliquid.xyz" },
  ],
  arbitrum: [
    { label: "Arbitrum Docs", url: "https://docs.arbitrum.io" },
    { label: "Developer Portal", url: "https://portal.arbitrum.io" },
    { label: "Arbiscan", url: "https://arbiscan.io" },
    { label: "Arbitrum GitHub", url: "https://github.com/OffchainLabs" },
  ],
  optimism: [
    { label: "Optimism Docs", url: "https://docs.optimism.io" },
    { label: "Superchain Docs", url: "https://docs.optimism.io/stack/getting-started" },
    { label: "Optimistic Etherscan", url: "https://optimistic.etherscan.io" },
    { label: "Optimism GitHub", url: "https://github.com/ethereum-optimism" },
  ],
  avalanche: [
    { label: "Avalanche Docs", url: "https://docs.avax.network" },
    { label: "Builder Hub", url: "https://build.avax.network" },
    { label: "Snowtrace", url: "https://snowtrace.io" },
    { label: "Avalanche GitHub", url: "https://github.com/ava-labs" },
  ],
  sui: [
    { label: "Sui Docs", url: "https://docs.sui.io" },
    { label: "Move Book", url: "https://move-book.com" },
    { label: "Sui Explorer", url: "https://suiscan.xyz" },
    { label: "Sui GitHub", url: "https://github.com/MystenLabs/sui" },
  ],
  aptos: [
    { label: "Aptos Docs", url: "https://aptos.dev" },
    { label: "Move on Aptos", url: "https://aptos.dev/build/smart-contracts" },
    { label: "Aptos Explorer", url: "https://explorer.aptoslabs.com" },
    { label: "Aptos GitHub", url: "https://github.com/aptos-labs" },
  ],
  polygon: [
    { label: "Polygon Docs", url: "https://docs.polygon.technology" },
    { label: "Polygon Portal", url: "https://polygon.technology/build" },
    { label: "Polygonscan", url: "https://polygonscan.com" },
    { label: "Polygon GitHub", url: "https://github.com/maticnetwork" },
  ],
  berachain: [
    { label: "Berachain Docs", url: "https://docs.berachain.com" },
    { label: "Developer Portal", url: "https://berachain.com/build" },
    { label: "BeraScan", url: "https://berascan.com" },
    { label: "Berachain GitHub", url: "https://github.com/berachain" },
  ],
  monad: [
    { label: "Monad Docs", url: "https://docs.monad.xyz" },
    { label: "Developer Portal", url: "https://monad.xyz/developers" },
    { label: "Monad GitHub", url: "https://github.com/monad-xyz" },
    { label: "Testnet Faucet", url: "https://monad.xyz" },
  ],
};

export function getFeaturedProjectsForEcosystem(slug: string) {
  return ecosystemFeaturedProjects[slug] ?? [];
}

export function getResourcesForEcosystem(slug: string) {
  return ecosystemResources[slug] ?? [];
}
