export const buildExamples = [
  "Trading platform",
  "Crypto neobank",
  "Wallet login system",
  "Payroll app",
  "Bug bounty platform",
] as const;

export const popularRecipes = [
  {
    slug: "wallet-login",
    title: "Wallet login system",
    description:
      "Connect MetaMask and WalletConnect, sign messages, and persist sessions with wagmi.",
    meta: "Web3 · 12 min",
    href: "/recipes",
  },
  {
    slug: "trading-platform",
    title: "Trading platform stack",
    description:
      "Price feeds, order routing APIs, and charting libraries with free-tier providers.",
    meta: "Fintech · 18 min",
    href: "/recipes",
  },
  {
    slug: "crypto-neobank",
    title: "Crypto neobank MVP",
    description:
      "Custody, KYC sandbox, and fiat on-ramps using freemium banking APIs.",
    meta: "Fintech · 25 min",
    href: "/recipes",
  },
  {
    slug: "payroll-app",
    title: "Payroll app",
    description:
      "Run payroll with Stripe Connect test mode and ledger double-entry records.",
    meta: "Fintech · 15 min",
    href: "/recipes",
  },
  {
    slug: "bug-bounty",
    title: "Bug bounty platform",
    description:
      "Scope repos, triage reports, and pay rewards with on-chain or fiat rails.",
    meta: "Developer · 20 min",
    href: "/recipes",
  },
  {
    slug: "ai-agent",
    title: "AI agent with tools",
    description:
      "Wire LangChain to Ollama and expose function calls over a REST API.",
    meta: "AI · 14 min",
    href: "/recipes",
  },
] as const;

export const homepageEcosystems = [
  {
    name: "Base",
    description: "Coinbase L2 · EVM",
    href: "/ecosystems/base",
  },
  {
    name: "Hyperliquid",
    description: "Perps DEX · L1",
    href: "/ecosystems/hyperliquid",
  },
  {
    name: "Ethereum",
    description: "Smart contracts · EVM",
    href: "/ecosystems/ethereum",
  },
  {
    name: "Solana",
    description: "High throughput · SVM",
    href: "/ecosystems/solana",
  },
  {
    name: "Arbitrum",
    description: "Optimistic rollup · EVM",
    href: "/ecosystems/arbitrum",
  },
  {
    name: "Sui",
    description: "Move VM · Parallel execution",
    href: "/ecosystems/sui",
  },
] as const;

export const grantOpportunities = [
  {
    name: "Gitcoin Grants",
    org: "Gitcoin",
    deadline: "Rolling",
    href: "/grants",
  },
  {
    name: "Base Builder Grants",
    org: "Coinbase",
    deadline: "Q2 2026",
    href: "/grants",
  },
  {
    name: "Ethereum ESP",
    org: "Ethereum Foundation",
    deadline: "Applications open",
    href: "/grants",
  },
  {
    name: "Optimism RetroPGF",
    org: "Optimism Collective",
    deadline: "Season 7",
    href: "/grants",
  },
  {
    name: "Solana Foundation",
    org: "Solana",
    deadline: "Rolling",
    href: "/grants",
  },
] as const;

export const builderIntelPosts = [
  {
    id: "1",
    author: "Alchemy",
    handle: "@Alchemy",
    time: "2h ago",
    text: "Free tier now includes 300M compute units/month on Base mainnet. Docs updated with new rate limits.",
    href: "/builder-intel",
  },
  {
    id: "2",
    author: "wagmi",
    handle: "@wagmi_dev",
    time: "5h ago",
    text: "wagmi v2 migration guide published. viem is now the default transport — upgrade path documented.",
    href: "/builder-intel",
  },
  {
    id: "3",
    author: "Stripe Dev",
    handle: "@stripe_dev",
    time: "1d ago",
    text: "Test mode webhooks now support local forwarding via Stripe CLI. No live keys required for integration tests.",
    href: "/builder-intel",
  },
  {
    id: "4",
    author: "Ollama",
    handle: "@ollama",
    time: "1d ago",
    text: "New models: llama3.3, qwen2.5-coder. Pull with `ollama pull` — runs fully local, no API key.",
    href: "/builder-intel",
  },
] as const;
