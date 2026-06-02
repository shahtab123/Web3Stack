/** Curated platforms to source free / open-source recipes from. */
export const RECIPE_SOURCE_PLATFORMS = [
  "Coinbase CDP",
  "Base",
  "thirdweb",
  "Aave",
  "Uniswap",
  "ENS",
  "XMTP",
  "Farcaster",
  "Alchemy",
  "WalletConnect",
  "The Graph",
  "Lens",
  "Safe",
  "Moralis",
  "Polygon",
  "Arbitrum",
  "Solana",
  "Sui",
  "Avalanche",
  "Aptos",
  "Starknet",
  "EigenLayer",
] as const;

export type RecipeSourcePlatform = (typeof RECIPE_SOURCE_PLATFORMS)[number];
