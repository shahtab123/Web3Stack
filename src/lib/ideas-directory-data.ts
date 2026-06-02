import type { IdeaEntry } from "./ideas-directory-types";

function defineIdea(entry: IdeaEntry): IdeaEntry {
  return entry;
}

export const ideasDirectory: IdeaEntry[] = [
  defineIdea({
    slug: "group-treasury",
    title: "Group Treasury",
    description:
      "A shared crypto treasury for friend groups, gaming clans and investment clubs.",
    overview:
      "A multisig-backed shared wallet where groups pool funds, vote on spends, and track contributions transparently.",
    problem:
      "Friend groups, DAOs, and clans coordinate money in spreadsheets and DMs with no shared ledger or spend controls.",
    suggestedFeatures: [
      "Shared multisig wallet",
      "Member contribution tracking",
      "Spend proposals and voting",
      "Activity feed and exports",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "crypto-finance",
    category: "payments",
    apiSlugs: ["privy", "alchemy", "walletconnect"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["safe-wallet-web", "automated-mass-payouts"],
    relatedIdeaSlugs: ["crypto-neobank", "personal-crypto-cfo"],
    examples: [{ name: "Safe", url: "https://safe.global" }],
  }),
  defineIdea({
    slug: "wallet-crm",
    title: "Wallet CRM",
    description:
      "Track user wallet activity, balances and engagement like a traditional CRM.",
    overview:
      "A lightweight CRM for dApps that ties wallet addresses to product usage, on-chain activity, and engagement metrics.",
    problem:
      "Web3 products lack simple tools to understand user behavior beyond raw wallet addresses and transaction hashes.",
    suggestedFeatures: [
      "Wallet-based user profiles",
      "On-chain activity timeline",
      "Engagement scoring",
      "Segment export for marketing",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "1–3 weeks",
    group: "crypto-finance",
    category: "analytics",
    apiSlugs: ["privy", "alchemy", "dune"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["defi-dashboard", "hey-social-app"],
    relatedIdeaSlugs: ["defi-dashboard", "onchain-resume"],
    examples: [
      { name: "Dune", url: "https://dune.com" },
      { name: "Nansen", url: "https://www.nansen.ai" },
    ],
  }),
  defineIdea({
    slug: "stablecoin-payroll",
    title: "Stablecoin Payroll",
    description:
      "Pay global teams using stablecoins with automated recurring payments.",
    overview:
      "Automate contractor and employee payouts in USDC or other stablecoins with schedules, approvals, and reporting.",
    problem:
      "Global teams face slow cross-border payroll, FX fees, and poor visibility into recurring crypto payouts.",
    suggestedFeatures: [
      "Recurring payout schedules",
      "Multi-recipient batch transfers",
      "Invoice and approval workflow",
      "Tax-ready export reports",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "crypto-finance",
    category: "payments",
    apiSlugs: ["stripe", "circle", "privy", "rain"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["payroll-app", "automated-mass-payouts"],
    relatedIdeaSlugs: ["crypto-neobank", "personal-crypto-cfo"],
    examples: [
      { name: "Request Finance", url: "https://www.request.finance" },
      { name: "Deel", url: "https://www.deel.com" },
    ],
  }),
  defineIdea({
    slug: "ai-portfolio-manager",
    title: "AI Portfolio Manager",
    description:
      "AI analyzes positions, funding rates and onchain activity to generate portfolio insights.",
    overview:
      "An AI copilot that reads wallet positions, perp funding, and protocol exposure to surface rebalancing and risk insights.",
    problem:
      "Active traders and treasuries cannot manually monitor positions, funding, and risk across chains and protocols.",
    suggestedFeatures: [
      "Multi-wallet position aggregation",
      "Funding rate and yield alerts",
      "LLM-generated portfolio summaries",
      "Risk and concentration scoring",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–8 weeks",
    group: "crypto-finance",
    category: "analytics",
    apiSlugs: ["hyperliquid", "pyth", "ollama", "alchemy", "dune"],
    ecosystemSlugs: ["hyperliquid", "ethereum", "base"],
    relatedRecipeSlugs: ["defi-dashboard", "ai-trading-agent"],
    relatedIdeaSlugs: ["defi-dashboard", "personal-crypto-cfo", "ai-trading-assistant"],
    examples: [
      { name: "DeBank", url: "https://debank.com" },
      { name: "Zapper", url: "https://zapper.xyz" },
    ],
  }),
  defineIdea({
    slug: "personal-crypto-cfo",
    title: "Personal Crypto CFO",
    description:
      "Track expenses, subscriptions, salaries and treasury health from wallets.",
    overview:
      "A personal finance dashboard that categorizes on-chain outflows, recurring subscriptions, and treasury runway.",
    problem:
      "Founders and power users lack a unified view of crypto spending, subscriptions, and runway across wallets.",
    suggestedFeatures: [
      "Expense categorization from txs",
      "Subscription and recurring payment tracking",
      "Treasury runway projections",
      "Monthly burn reports",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–6 weeks",
    group: "crypto-finance",
    category: "analytics",
    apiSlugs: ["alchemy", "dune", "privy", "plaid"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["defi-dashboard", "payroll-app"],
    relatedIdeaSlugs: ["group-treasury", "subscription-manager", "defi-dashboard"],
    examples: [{ name: "Rotki", url: "https://rotki.com" }],
  }),
  defineIdea({
    slug: "crypto-neobank",
    title: "Crypto Neobank",
    description:
      "Cards, payroll, stablecoin savings and spending accounts.",
    overview:
      "Combine wallet onboarding, stablecoin treasury, virtual cards, and bank linking into a consumer neobank experience.",
    problem:
      "Users want to hold, spend, and move crypto and fiat from one app without juggling multiple providers.",
    suggestedFeatures: [
      "Embedded wallet onboarding",
      "USDC treasury and balances",
      "Virtual card spending",
      "Bank account linking",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "8–12 weeks",
    group: "crypto-finance",
    category: "payments",
    apiSlugs: ["rain", "circle", "privy", "plaid"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["crypto-neobank"],
    relatedIdeaSlugs: ["stablecoin-payroll", "virtual-card-program"],
    examples: [
      { name: "Rain", url: "https://rain.xyz" },
      { name: "Revolut", url: "https://www.revolut.com" },
    ],
  }),
  defineIdea({
    slug: "crypto-payroll-platform",
    title: "Crypto Payroll Platform",
    description:
      "Pay remote teams using stablecoins with automated payouts and reporting.",
    overview:
      "A payroll product that lets companies pay contractors and employees in stablecoins or fiat, with tax-friendly reporting and batch payouts.",
    problem:
      "Remote teams and crypto-native companies struggle with cross-border payroll, stablecoin treasury management, and audit-ready payout records.",
    suggestedFeatures: [
      "Contractor onboarding with KYC",
      "Batch stablecoin payouts",
      "Fiat off-ramp options",
      "Payout history and export reports",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "crypto-finance",
    category: "payments",
    apiSlugs: ["stripe", "plaid", "circle", "privy"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["payroll-app", "crypto-neobank"],
    relatedIdeaSlugs: ["stablecoin-payroll", "crypto-neobank"],
    examples: [
      { name: "Deel", url: "https://www.deel.com" },
      { name: "Request Finance", url: "https://www.request.finance" },
    ],
  }),
  defineIdea({
    slug: "defi-dashboard",
    title: "DeFi Portfolio Dashboard",
    description:
      "Track wallets, protocol positions, and on-chain metrics in one view.",
    overview:
      "A dashboard that aggregates wallet holdings, DeFi positions, and protocol analytics across chains.",
    problem:
      "Users spread assets across protocols and chains with no single view of portfolio performance and risk.",
    suggestedFeatures: [
      "Multi-wallet connection",
      "Protocol position tracking",
      "PnL and allocation charts",
      "Custom alerts",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "crypto-finance",
    category: "analytics",
    apiSlugs: ["alchemy", "the-graph", "dune", "privy"],
    ecosystemSlugs: ["ethereum", "arbitrum", "base"],
    relatedRecipeSlugs: ["defi-dashboard"],
    relatedIdeaSlugs: ["wallet-crm", "ai-portfolio-manager"],
    examples: [
      { name: "Zapper", url: "https://zapper.xyz" },
      { name: "DeBank", url: "https://debank.com" },
    ],
  }),
  defineIdea({
    slug: "copy-trading-platform",
    title: "Copy Trading Platform",
    description:
      "Let users follow top traders and mirror positions with real-time alerts.",
    overview:
      "A social trading app where users subscribe to traders, mirror strategies, and receive alerts on position changes.",
    problem:
      "Retail traders want to follow skilled traders without manually copying every trade across interfaces.",
    suggestedFeatures: [
      "Trader leaderboards",
      "One-click copy trading",
      "Real-time position sync",
      "Telegram or push alerts",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "6–10 weeks",
    group: "crypto-finance",
    category: "trading",
    apiSlugs: ["hyperliquid", "privy", "pyth", "telegram"],
    ecosystemSlugs: ["hyperliquid", "ethereum"],
    relatedRecipeSlugs: ["copy-trading-platform", "trading-platform"],
    relatedIdeaSlugs: ["ai-trading-assistant", "group-trading-game"],
    examples: [{ name: "Bitget Copy Trading", url: "https://www.bitget.com" }],
  }),
  defineIdea({
    slug: "virtual-card-program",
    title: "Virtual Card Program",
    description:
      "Issue virtual cards backed by stablecoin treasuries for teams or consumers.",
    overview:
      "Launch a card program where users spend from crypto balances via virtual Visa cards with spend controls.",
    problem:
      "Crypto treasuries are hard to spend without off-ramping manually or using fragmented card providers.",
    suggestedFeatures: [
      "Virtual card issuance",
      "Spend limits and controls",
      "Stablecoin treasury linkage",
      "Transaction export",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "4–6 weeks",
    group: "crypto-finance",
    category: "cards",
    apiSlugs: ["rain", "marble", "circle", "privy"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["crypto-neobank"],
    relatedIdeaSlugs: ["crypto-neobank", "stablecoin-payroll"],
    examples: [
      { name: "Rain", url: "https://rain.xyz" },
      { name: "Marble", url: "https://www.marble.xyz" },
    ],
  }),
  defineIdea({
    slug: "voice-trading",
    title: "Voice Trading",
    description:
      "Trade, stake and manage positions entirely through voice commands.",
    overview:
      "A voice-first trading assistant that listens for commands, confirms intent, and executes on-chain or perp trades safely.",
    problem:
      "Traders on mobile or away from screens cannot act quickly without a hands-free interface they trust.",
    suggestedFeatures: [
      "Voice command parsing",
      "Trade confirmation flow",
      "Position and balance readback",
      "Hyperliquid or DEX execution",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "6–10 weeks",
    group: "ai",
    category: "ai",
    apiSlugs: ["ollama", "hyperliquid", "privy", "pyth"],
    ecosystemSlugs: ["hyperliquid", "base"],
    relatedRecipeSlugs: ["ai-trading-agent", "trading-platform"],
    relatedIdeaSlugs: ["ai-trading-assistant", "ai-wallet-assistant"],
    examples: [{ name: "Siri + Trading Bots", url: "https://github.com" }],
  }),
  defineIdea({
    slug: "ai-research-analyst",
    title: "AI Research Analyst",
    description:
      "Researches protocols, governance proposals and ecosystem updates.",
    overview:
      "An AI agent that monitors governance forums, protocol docs, and on-chain metrics to produce daily research briefs.",
    problem:
      "Builders and investors miss governance votes, upgrades, and ecosystem news spread across dozens of sources.",
    suggestedFeatures: [
      "Governance proposal summaries",
      "Protocol changelog digests",
      "On-chain metric highlights",
      "Custom watchlists and alerts",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–8 weeks",
    group: "ai",
    category: "ai",
    apiSlugs: ["ollama", "the-graph", "dune", "huggingface"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["onchain-agent-demo", "agentkit"],
    relatedIdeaSlugs: ["ai-grant-hunter", "ai-portfolio-manager"],
    examples: [{ name: "Messari", url: "https://messari.io" }],
  }),
  defineIdea({
    slug: "ai-grant-hunter",
    title: "AI Grant Hunter",
    description:
      "Tracks grants, hackathons and ecosystem opportunities.",
    overview:
      "An AI-powered feed that aggregates grants, hackathons, and builder programs and matches them to your stack and skills.",
    problem:
      "Developers waste hours hunting grants and hackathons across ecosystem sites, Discord, and Twitter.",
    suggestedFeatures: [
      "Grant and hackathon aggregator",
      "Eligibility matching",
      "Deadline reminders",
      "Application draft assistant",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "ai",
    category: "ai",
    apiSlugs: ["ollama", "supabase", "huggingface"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["agentkit"],
    relatedIdeaSlugs: ["grant-discovery-platform", "internet-opportunities-feed"],
    examples: [{ name: "Gitcoin Grants", url: "https://grants.gitcoin.co" }],
  }),
  defineIdea({
    slug: "ai-bug-bounty-assistant",
    title: "AI Bug Bounty Assistant",
    description:
      "Finds relevant bug bounties and helps researchers understand targets.",
    overview:
      "An AI copilot for security researchers that scopes repos, summarizes attack surfaces, and drafts submission reports.",
    problem:
      "Researchers struggle to find programs that match their skills and to quickly understand unfamiliar codebases.",
    suggestedFeatures: [
      "Bounty program matching",
      "Repo and scope summarization",
      "Vulnerability report drafting",
      "Severity triage suggestions",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–6 weeks",
    group: "ai",
    category: "ai",
    apiSlugs: ["immunefi", "ollama", "supabase"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["bug-bounty-platform"],
    relatedIdeaSlugs: ["bug-bounty-platform", "smart-contract-risk-dashboard"],
    examples: [{ name: "Immunefi", url: "https://immunefi.com" }],
  }),
  defineIdea({
    slug: "ai-wallet-assistant",
    title: "AI Wallet Assistant",
    description:
      "Explains transactions, balances and wallet activity in plain English.",
    overview:
      "A chat assistant connected to wallets that translates transactions, flags suspicious activity, and answers balance questions.",
    problem:
      "Most users cannot interpret raw transaction data, token approvals, or complex DeFi interactions.",
    suggestedFeatures: [
      "Transaction plain-English summaries",
      "Approval and risk warnings",
      "Balance and history Q&A",
      "Embedded chat widget",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "ai",
    category: "ai",
    apiSlugs: ["ollama", "alchemy", "privy"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["agentkit", "onchain-agent-demo"],
    relatedIdeaSlugs: ["wallet-crm", "wallet-security-score"],
    examples: [{ name: "Etherscan Labels", url: "https://etherscan.io" }],
  }),
  defineIdea({
    slug: "ai-trading-assistant",
    title: "AI Trading Assistant",
    description:
      "An AI-powered assistant that monitors markets and helps users execute trades.",
    overview:
      "A trading copilot that ingests market data, summarizes conditions, and surfaces actionable signals with optional automated execution.",
    problem:
      "Retail traders miss opportunities because they cannot monitor markets continuously or interpret data across multiple feeds quickly enough.",
    suggestedFeatures: [
      "Live price and position monitoring",
      "LLM-generated market summaries",
      "Alert rules and Telegram notifications",
      "Optional trade execution via exchange API",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–8 weeks",
    group: "ai",
    category: "ai",
    apiSlugs: ["hyperliquid", "pyth", "ollama", "telegram", "privy"],
    ecosystemSlugs: ["hyperliquid", "ethereum"],
    relatedRecipeSlugs: ["ai-trading-agent", "trading-platform"],
    relatedIdeaSlugs: ["copy-trading-platform", "ai-portfolio-manager"],
    examples: [{ name: "TradeGPT", url: "https://www.tradegpt.finance" }],
  }),
  defineIdea({
    slug: "ai-support-bot",
    title: "AI Support Bot",
    description:
      "Docs-aware chatbot with local inference and a simple web widget.",
    overview:
      "An embeddable support bot that answers product questions using your docs and runs on local or API-based LLMs.",
    problem:
      "Small teams cannot afford 24/7 support staff but still need instant answers to common product questions.",
    suggestedFeatures: [
      "Docs ingestion pipeline",
      "Chat widget embed",
      "Local or API LLM backend",
      "Conversation logging",
    ],
    difficulty: "beginner",
    estimatedBuildTime: "1–2 weeks",
    group: "ai",
    category: "ai",
    apiSlugs: ["ollama", "supabase", "huggingface"],
    ecosystemSlugs: ["ethereum"],
    relatedRecipeSlugs: ["ai-support-bot"],
    relatedIdeaSlugs: ["ai-wallet-assistant", "web3-stack-generator"],
    examples: [{ name: "Intercom Fin", url: "https://www.intercom.com" }],
  }),
  defineIdea({
    slug: "builder-reputation-graph",
    title: "Builder Reputation Graph",
    description:
      "Track contributions across GitHub, Farcaster, hackathons and open source.",
    overview:
      "A reputation layer that aggregates a builder's GitHub, Farcaster, hackathon, and OSS contributions into one profile.",
    problem:
      "Talent and credibility in Web3 is scattered across platforms with no portable reputation graph.",
    suggestedFeatures: [
      "GitHub and OSS contribution sync",
      "Farcaster and Lens activity",
      "Hackathon placement badges",
      "Public builder score",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "6–10 weeks",
    group: "social",
    category: "social",
    apiSlugs: ["privy", "supabase", "alchemy"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["hey-social-app", "farcaster-mint-frame"],
    relatedIdeaSlugs: ["onchain-resume", "builder-matchmaking"],
    examples: [{ name: "GitHub", url: "https://github.com" }],
  }),
  defineIdea({
    slug: "web3-product-hunt",
    title: "Web3 Product Hunt",
    description: "Launch and discover crypto products.",
    overview:
      "A daily launch board for crypto apps, tools, and protocols with upvotes, comments, and maker profiles.",
    problem:
      "New Web3 products launch on Twitter threads with no central discovery surface for early adopters.",
    suggestedFeatures: [
      "Daily product launches",
      "Upvote and comment threads",
      "Maker profiles with wallets",
      "Launch analytics",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "4–6 weeks",
    group: "social",
    category: "social",
    apiSlugs: ["privy", "supabase", "alchemy"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["base-social-mini-app"],
    relatedIdeaSlugs: ["build-in-public-tracker", "internet-opportunities-feed"],
    examples: [{ name: "Product Hunt", url: "https://www.producthunt.com" }],
  }),
  defineIdea({
    slug: "onchain-resume",
    title: "Onchain Resume",
    description:
      "A portfolio generated automatically from wallets and contributions.",
    overview:
      "Auto-build a builder profile from wallet activity, NFTs, governance votes, GitHub, and hackathon submissions.",
    problem:
      "Developers manually curate portfolios while their real work is already visible on-chain and on GitHub.",
    suggestedFeatures: [
      "Wallet activity portfolio",
      "GitHub repo highlights",
      "Governance participation",
      "Shareable public profile",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "social",
    category: "social",
    apiSlugs: ["privy", "alchemy", "the-graph", "dune"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["hey-social-app"],
    relatedIdeaSlugs: ["builder-reputation-graph", "wallet-crm"],
    examples: [{ name: "Read.cv", url: "https://read.cv" }],
  }),
  defineIdea({
    slug: "builder-matchmaking",
    title: "Builder Matchmaking",
    description:
      "Match founders with developers, designers and marketers.",
    overview:
      "A talent marketplace where founders post projects and builders apply with on-chain resumes and reputation scores.",
    problem:
      "Early-stage crypto teams struggle to find co-founders and contributors outside of noisy Telegram groups.",
    suggestedFeatures: [
      "Project and role listings",
      "Builder profiles with reputation",
      "Application and intro flow",
      "Team formation tools",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "4–6 weeks",
    group: "social",
    category: "social",
    apiSlugs: ["privy", "supabase"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["hey-social-app"],
    relatedIdeaSlugs: ["builder-reputation-graph", "onchain-resume"],
    examples: [{ name: "Y Combinator Co-Founder Matching", url: "https://www.ycombinator.com" }],
  }),
  defineIdea({
    slug: "socialfi-app",
    title: "SocialFi App",
    description:
      "On-chain profiles, token-gated feeds, and embedded wallet onboarding.",
    overview:
      "A social app with wallet login, on-chain profiles, and token-gated content for crypto-native communities.",
    problem:
      "Crypto communities lack social platforms that natively integrate wallets, tokens, and on-chain identity.",
    suggestedFeatures: [
      "Wallet login and profiles",
      "Token-gated posts",
      "Creator tipping",
      "Feed and notifications",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "6–10 weeks",
    group: "social",
    category: "social",
    apiSlugs: ["privy", "supabase", "alchemy"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["socialfi-app"],
    relatedIdeaSlugs: ["hey-social-app", "creator-membership-platform"],
    examples: [
      { name: "Farcaster", url: "https://farcaster.xyz" },
      { name: "Lens", url: "https://lens.xyz" },
    ],
  }),
  defineIdea({
    slug: "prediction-league",
    title: "Prediction League",
    description:
      "Compete on prediction accuracy across sports, crypto and current events.",
    overview:
      "A social prediction market league where friends stake reputation points on sports, crypto, and news outcomes.",
    problem:
      "Prediction enthusiasts lack lightweight leagues to compete on accuracy without complex market infrastructure.",
    suggestedFeatures: [
      "Prediction markets on events",
      "Leaderboards and seasons",
      "Friend leagues and invites",
      "Resolution and scoring engine",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "6–10 weeks",
    group: "gaming",
    category: "gaming",
    apiSlugs: ["pyth", "privy", "supabase"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["farcaster-mint-frame"],
    relatedIdeaSlugs: ["group-trading-game", "onchain-fantasy-markets"],
    examples: [{ name: "Polymarket", url: "https://polymarket.com" }],
  }),
  defineIdea({
    slug: "group-trading-game",
    title: "Group Trading Game",
    description: "Compete with friends using virtual portfolios.",
    overview:
      "Paper-trading leagues where friend groups compete on virtual portfolios using live market data.",
    problem:
      "New traders want low-risk ways to learn markets and compete with friends without risking real capital.",
    suggestedFeatures: [
      "Virtual portfolio accounts",
      "Live market data feeds",
      "Weekly competitions",
      "Friend group leaderboards",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–6 weeks",
    group: "gaming",
    category: "gaming",
    apiSlugs: ["hyperliquid", "pyth", "privy"],
    ecosystemSlugs: ["hyperliquid", "ethereum"],
    relatedRecipeSlugs: ["fantasy-trading-game"],
    relatedIdeaSlugs: ["fantasy-trading-game", "copy-trading-platform"],
    examples: [{ name: "Stryke", url: "https://stryke.xyz" }],
  }),
  defineIdea({
    slug: "onchain-fantasy-markets",
    title: "Onchain Fantasy Markets",
    description: "Fantasy sports powered by real market performance.",
    overview:
      "Draft teams of tokens or traders and score fantasy points based on real price and PnL performance.",
    problem:
      "Crypto natives want fantasy formats that reflect market skill, not just traditional sports stats.",
    suggestedFeatures: [
      "Token or trader drafts",
      "Live scoring from market data",
      "Seasonal leagues",
      "Prize pools and NFT trophies",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "6–10 weeks",
    group: "gaming",
    category: "gaming",
    apiSlugs: ["hyperliquid", "pyth", "alchemy", "privy"],
    ecosystemSlugs: ["hyperliquid", "base"],
    relatedRecipeSlugs: ["fantasy-trading-game"],
    relatedIdeaSlugs: ["group-trading-game", "prediction-league"],
    examples: [{ name: "Sorare", url: "https://sorare.com" }],
  }),
  defineIdea({
    slug: "ai-vs-ai-trading-arena",
    title: "AI-vs-AI Trading Arena",
    description:
      "AI agents compete against each other using simulated funds.",
    overview:
      "A spectator arena where LLM-powered trading agents battle on paper portfolios with live market feeds and public leaderboards.",
    problem:
      "AI agent builders lack a fun, competitive benchmark to compare trading strategies in public.",
    suggestedFeatures: [
      "Agent registration and configs",
      "Simulated fund battles",
      "Live leaderboard and replays",
      "Strategy comparison analytics",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "6–12 weeks",
    group: "gaming",
    category: "gaming",
    apiSlugs: ["ollama", "hyperliquid", "pyth", "litellm"],
    ecosystemSlugs: ["hyperliquid", "base"],
    relatedRecipeSlugs: ["ai-trading-agent", "agentkit"],
    relatedIdeaSlugs: ["ai-trading-assistant", "group-trading-game"],
    examples: [{ name: "Numerai", url: "https://numer.ai" }],
  }),
  defineIdea({
    slug: "fantasy-trading-game",
    title: "Fantasy Trading Game",
    description:
      "Paper-trade competitions with live market data and wallet-based leaderboards.",
    overview:
      "A gamified trading app where users compete in paper-trading leagues using live market feeds and on-chain identity.",
    problem:
      "New traders want low-risk ways to learn markets and compete with friends without risking real capital.",
    suggestedFeatures: [
      "Paper trading accounts",
      "Live market data feeds",
      "Weekly competitions",
      "Wallet-based leaderboards",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–6 weeks",
    group: "gaming",
    category: "gaming",
    apiSlugs: ["hyperliquid", "pyth", "privy"],
    ecosystemSlugs: ["hyperliquid", "ethereum"],
    relatedRecipeSlugs: ["fantasy-trading-game"],
    relatedIdeaSlugs: ["group-trading-game", "ai-vs-ai-trading-arena"],
    examples: [{ name: "Stryke", url: "https://stryke.xyz" }],
  }),
  defineIdea({
    slug: "api-discovery-engine",
    title: "API Discovery Engine",
    description: "Exactly your current project.",
    overview:
      "A searchable directory of crypto APIs, SDKs, recipes, and builder resources — Web3Stack itself.",
    problem:
      "Developers waste days discovering which APIs, grants, and starter projects exist across fragmented ecosystem sites.",
    suggestedFeatures: [
      "Searchable API directory",
      "Recipe and idea galleries",
      "Ecosystem and grant explorer",
      "Stack recommendation engine",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "4–8 weeks",
    group: "infrastructure",
    category: "infrastructure",
    apiSlugs: ["supabase", "alchemy", "dune"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["defi-dashboard"],
    relatedIdeaSlugs: ["ecosystem-explorer", "web3-stack-generator"],
    examples: [{ name: "Web3Stack", url: "https://github.com" }],
  }),
  defineIdea({
    slug: "grant-discovery-platform",
    title: "Grant Discovery Platform",
    description:
      "Search grants, hackathons and builder opportunities across ecosystems.",
    overview:
      "A unified search engine for ecosystem grants, hackathons, accelerators, and builder programs with filters and alerts.",
    problem:
      "Funding opportunities are scattered across dozens of ecosystem portals with inconsistent formats and deadlines.",
    suggestedFeatures: [
      "Cross-ecosystem grant search",
      "Deadline and eligibility filters",
      "Saved searches and alerts",
      "Application link aggregation",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–6 weeks",
    group: "infrastructure",
    category: "infrastructure",
    apiSlugs: ["supabase", "ollama"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: [],
    relatedIdeaSlugs: ["ai-grant-hunter", "open-source-revenue-tracker"],
    examples: [{ name: "Gitcoin Grants", url: "https://grants.gitcoin.co" }],
  }),
  defineIdea({
    slug: "ecosystem-explorer",
    title: "Ecosystem Explorer",
    description:
      "Discover APIs, examples, funding and projects by ecosystem.",
    overview:
      "Browse each chain ecosystem with curated APIs, recipes, grants, and featured projects in one portal.",
    problem:
      "Developers joining a new chain must manually hunt docs, grants, and example repos across many sites.",
    suggestedFeatures: [
      "Per-ecosystem landing pages",
      "API and recipe curation",
      "Grant and hackathon listings",
      "Featured project showcases",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "4–6 weeks",
    group: "infrastructure",
    category: "infrastructure",
    apiSlugs: ["alchemy", "dune", "supabase"],
    ecosystemSlugs: ["ethereum", "base", "solana"],
    relatedRecipeSlugs: [],
    relatedIdeaSlugs: ["api-discovery-engine", "grant-discovery-platform"],
    examples: [{ name: "Base Docs", url: "https://docs.base.org" }],
  }),
  defineIdea({
    slug: "open-source-revenue-tracker",
    title: "Open Source Revenue Tracker",
    description:
      "Track grants, sponsorships and revenue opportunities for open-source projects.",
    overview:
      "A dashboard for maintainers to track grants, GitHub Sponsors, ecosystem funding, and paid integration opportunities.",
    problem:
      "OSS maintainers juggle grants, sponsors, and ecosystem programs with no unified revenue pipeline view.",
    suggestedFeatures: [
      "Grant and sponsor pipeline",
      "Deadline reminders",
      "Revenue forecasting",
      "Integration opportunity feed",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "infrastructure",
    category: "infrastructure",
    apiSlugs: ["supabase", "stripe"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: [],
    relatedIdeaSlugs: ["grant-discovery-platform", "open-source-bounty-board"],
    examples: [{ name: "GitHub Sponsors", url: "https://github.com/sponsors" }],
  }),
  defineIdea({
    slug: "creator-membership-platform",
    title: "Creator Membership Platform",
    description: "Token-gated memberships and premium communities.",
    overview:
      "Let creators launch token- or NFT-gated memberships with exclusive content, Discord roles, and recurring payments.",
    problem:
      "Creators want patronage and membership models that natively use wallets and tokens instead of legacy paywalls.",
    suggestedFeatures: [
      "Token-gated content",
      "Membership tiers",
      "Recurring crypto payments",
      "Community integrations",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "4–6 weeks",
    group: "commerce",
    category: "commerce",
    apiSlugs: ["privy", "alchemy", "stripe"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["onchain-commerce-shop", "thirdweb-nft-marketplace"],
    relatedIdeaSlugs: ["socialfi-app", "onchain-commerce-store"],
    examples: [{ name: "Mirror", url: "https://mirror.xyz" }],
  }),
  defineIdea({
    slug: "onchain-commerce-store",
    title: "Onchain Commerce Store",
    description: "Accept stablecoins and crypto payments with minimal setup.",
    overview:
      "A storefront builder for selling digital and physical goods with USDC checkout and wallet-native receipts.",
    problem:
      "Merchants want Shopify-simple checkout that accepts crypto without building payment infrastructure from scratch.",
    suggestedFeatures: [
      "Product catalog and checkout",
      "USDC and ETH payments",
      "Order management dashboard",
      "Receipt NFTs or emails",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "commerce",
    category: "commerce",
    apiSlugs: ["privy", "alchemy", "circle"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["onchain-commerce-shop", "solana-pay-store"],
    relatedIdeaSlugs: ["creator-membership-platform", "nft-marketplace"],
    examples: [{ name: "Coinbase Commerce", url: "https://www.coinbase.com/commerce" }],
  }),
  defineIdea({
    slug: "subscription-manager",
    title: "Subscription Manager",
    description: "Track and manage all recurring crypto subscriptions.",
    overview:
      "Scan wallets for recurring protocol fees, SaaS subscriptions paid in crypto, and membership renewals in one dashboard.",
    problem:
      "Users lose track of recurring on-chain subscriptions, approvals, and SaaS charges paid from crypto wallets.",
    suggestedFeatures: [
      "Recurring payment detection",
      "Renewal calendar",
      "Spend alerts",
      "Cancel and revoke helpers",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "commerce",
    category: "commerce",
    apiSlugs: ["alchemy", "privy", "dune"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["defi-dashboard"],
    relatedIdeaSlugs: ["personal-crypto-cfo", "creator-membership-platform"],
    examples: [{ name: "Revoke.cash", url: "https://revoke.cash" }],
  }),
  defineIdea({
    slug: "nft-marketplace",
    title: "NFT Marketplace",
    description:
      "Mint, list, and trade NFTs with wallet login and indexed metadata.",
    overview:
      "A marketplace for creating, listing, and trading NFTs with wallet auth and indexed on-chain metadata.",
    problem:
      "Creators and communities need simple tooling to launch NFT collections without building infrastructure from scratch.",
    suggestedFeatures: [
      "Collection creation",
      "Wallet login",
      "Listings and offers",
      "Activity feed",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "4–6 weeks",
    group: "commerce",
    category: "commerce",
    apiSlugs: ["privy", "alchemy", "the-graph", "rainbowkit"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["nft-marketplace"],
    relatedIdeaSlugs: ["onchain-commerce-store", "creator-membership-platform"],
    examples: [
      { name: "OpenSea", url: "https://opensea.io" },
      { name: "Zora", url: "https://zora.co" },
    ],
  }),
  defineIdea({
    slug: "wallet-security-score",
    title: "Wallet Security Score",
    description:
      "Analyze wallets for risk factors and security practices.",
    overview:
      "Score any wallet on approval hygiene, phishing exposure, contract interactions, and security best practices.",
    problem:
      "Users have no simple way to assess whether their wallet setup is safe or over-exposed to risky approvals.",
    suggestedFeatures: [
      "Approval and allowance audit",
      "Phishing and scam exposure check",
      "Security score and recommendations",
      "Monitoring alerts",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "security",
    category: "security",
    apiSlugs: ["alchemy", "chainalysis", "immunefi"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: [],
    relatedIdeaSlugs: ["transaction-simulator", "smart-contract-risk-dashboard"],
    examples: [{ name: "Revoke.cash", url: "https://revoke.cash" }],
  }),
  defineIdea({
    slug: "smart-contract-risk-dashboard",
    title: "Smart Contract Risk Dashboard",
    description:
      "Monitor protocol risk, audits and incident history.",
    overview:
      "Aggregate audit status, incident history, TVL trends, and admin key risks for protocols users interact with.",
    problem:
      "DeFi users cannot easily compare protocol safety signals before depositing funds.",
    suggestedFeatures: [
      "Audit and bug bounty status",
      "Incident and exploit history",
      "Admin key and upgrade risk",
      "Portfolio exposure warnings",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "6–10 weeks",
    group: "security",
    category: "security",
    apiSlugs: ["immunefi", "dune", "the-graph", "chainalysis"],
    ecosystemSlugs: ["ethereum", "arbitrum", "base"],
    relatedRecipeSlugs: ["defi-dashboard"],
    relatedIdeaSlugs: ["wallet-security-score", "bug-bounty-platform"],
    examples: [{ name: "DeFiSafety", url: "https://defisafety.com" }],
  }),
  defineIdea({
    slug: "transaction-simulator",
    title: "Transaction Simulator",
    description:
      "Preview what a transaction will actually do before signing.",
    overview:
      "Simulate transactions to show balance changes, token transfers, and contract calls before the user signs.",
    problem:
      "Users sign transactions blindly and discover unexpected outcomes only after execution.",
    suggestedFeatures: [
      "Pre-sign simulation",
      "Balance change preview",
      "Approval and transfer breakdown",
      "Risk warnings on simulation",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–8 weeks",
    group: "security",
    category: "security",
    apiSlugs: ["alchemy", "privy"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: [],
    relatedIdeaSlugs: ["wallet-security-score", "ai-wallet-assistant"],
    examples: [{ name: "Tenderly", url: "https://tenderly.co" }],
  }),
  defineIdea({
    slug: "bug-bounty-platform",
    title: "Bug Bounty Platform",
    description:
      "Coordinate security researchers, triage reports, and manage bounty payouts.",
    overview:
      "A platform for protocols and apps to run bug bounty programs with scoped repos, researcher submissions, and reward payouts.",
    problem:
      "Teams launching DeFi or Web3 products need structured ways to receive and reward vulnerability reports.",
    suggestedFeatures: [
      "Program and scope management",
      "Researcher submission portal",
      "Severity triage workflow",
      "Bounty payout tracking",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "4–6 weeks",
    group: "security",
    category: "security",
    apiSlugs: ["immunefi", "supabase", "privy"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["bug-bounty-platform"],
    relatedIdeaSlugs: ["ai-bug-bounty-assistant", "smart-contract-risk-dashboard"],
    examples: [
      { name: "Immunefi", url: "https://immunefi.com" },
      { name: "HackerOne", url: "https://www.hackerone.com" },
    ],
  }),
  defineIdea({
    slug: "startup-graveyard",
    title: "Startup Graveyard",
    description:
      "Database of failed Web3 startups and lessons learned.",
    overview:
      "An archive of shut-down crypto startups with post-mortems, failure reasons, and lessons for future builders.",
    problem:
      "Builders repeat the same mistakes because failed Web3 startup stories are rarely documented in one place.",
    suggestedFeatures: [
      "Startup shutdown archive",
      "Tagged failure reasons",
      "Post-mortem essays",
      "Search by category and chain",
    ],
    difficulty: "beginner",
    estimatedBuildTime: "2–4 weeks",
    group: "weird",
    category: "discovery",
    apiSlugs: ["supabase"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: [],
    relatedIdeaSlugs: ["build-in-public-tracker", "internet-opportunities-feed"],
    examples: [{ name: "Failory", url: "https://www.failory.com" }],
  }),
  defineIdea({
    slug: "build-in-public-tracker",
    title: "Build in Public Tracker",
    description:
      "Follow projects building publicly across social media.",
    overview:
      "Aggregate build-in-public updates from Farcaster, Twitter, and GitHub into followable project timelines.",
    problem:
      "Builders share progress across platforms and followers miss updates without a unified project feed.",
    suggestedFeatures: [
      "Multi-platform update aggregation",
      "Project follow feeds",
      "Milestone tracking",
      "Weekly digest emails",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "weird",
    category: "discovery",
    apiSlugs: ["supabase", "privy"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["hey-social-app", "base-social-mini-app"],
    relatedIdeaSlugs: ["web3-product-hunt", "startup-graveyard"],
    examples: [{ name: "Indie Hackers", url: "https://www.indiehackers.com" }],
  }),
  defineIdea({
    slug: "internet-opportunities-feed",
    title: "Internet Opportunities Feed",
    description:
      "Curated startup ideas, grants and API launches.",
    overview:
      "A daily feed of new startup ideas, grant deadlines, API launches, and ecosystem opportunities for builders.",
    problem:
      "Opportunity signal is scattered across Twitter, Discord, and blogs with no single curated feed.",
    suggestedFeatures: [
      "Daily opportunity digest",
      "Grant and API launch alerts",
      "Idea submission queue",
      "Personalized filters",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "weird",
    category: "discovery",
    apiSlugs: ["supabase", "ollama"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: [],
    relatedIdeaSlugs: ["grant-discovery-platform", "web3-product-hunt"],
    examples: [{ name: "Hacker News", url: "https://news.ycombinator.com" }],
  }),
  defineIdea({
    slug: "open-source-bounty-board",
    title: "Open Source Bounty Board",
    description:
      "Earn rewards by contributing to open-source crypto projects.",
    overview:
      "A bounty board where protocols and OSS projects post paid tasks for contributors with on-chain or fiat payouts.",
    problem:
      "Skilled developers want paid OSS contributions but projects lack a simple bounty posting and payout flow.",
    suggestedFeatures: [
      "Bounty posting and discovery",
      "Contributor applications",
      "PR verification workflow",
      "Reward payout tracking",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "4–6 weeks",
    group: "weird",
    category: "discovery",
    apiSlugs: ["supabase", "privy", "stripe"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["web3-security-bounty-tracker"],
    relatedIdeaSlugs: ["open-source-revenue-tracker", "bug-bounty-platform"],
    examples: [{ name: "OnlyDust", url: "https://www.onlydust.com" }],
  }),
  defineIdea({
    slug: "web3-stack-generator",
    title: "Web3 Stack Generator",
    description:
      "Describe an app and get recommended APIs, SDKs and architecture.",
    overview:
      "An AI tool where builders describe their app idea and receive a recommended stack of APIs, SDKs, recipes, and architecture.",
    problem:
      "New builders spend weeks researching which APIs and patterns fit their idea across dozens of ecosystems.",
    suggestedFeatures: [
      "Natural language app input",
      "API and SDK recommendations",
      "Architecture diagram output",
      "Links to recipes and docs",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–6 weeks",
    group: "weird",
    category: "discovery",
    apiSlugs: ["ollama", "litellm", "supabase"],
    ecosystemSlugs: ["ethereum", "base"],
    relatedRecipeSlugs: ["agentkit", "onchain-agent-demo"],
    relatedIdeaSlugs: ["api-discovery-engine", "ecosystem-explorer"],
    examples: [{ name: "Web3Stack", url: "https://github.com" }],
  }),
];
