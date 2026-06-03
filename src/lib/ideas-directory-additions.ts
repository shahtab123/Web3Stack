import type { IdeaEntry } from "./ideas-directory-types";

function idea(entry: IdeaEntry): IdeaEntry {
  return entry;
}

export const ideaCatalogAdditionEntries: IdeaEntry[] = [
  // Agentic Apps
  idea({
    slug: "agent-tip-jar",
    title: "Agent Tip Jar",
    description:
      "AI agent that monitors your Farcaster/X activity and automatically tips contributors who engage meaningfully.",
    overview:
      "An autonomous tipping agent that scores replies, quotes, and mentions, then sends micro-tips onchain when engagement crosses your rules.",
    problem:
      "Creators want to reward quality engagement but cannot manually track and tip every meaningful contributor across social feeds.",
    suggestedFeatures: [
      "Farcaster and X activity ingestion",
      "Engagement scoring rules",
      "Automated micro-tip payouts",
      "Tip budget and allowlist controls",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–8 weeks",
    group: "agentic",
    category: "ai",
    apiSlugs: ["farcaster", "coinbase-agentkit", "xmtp", "privy"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["farcaster-miniapps-sdk", "agentkit", "xmtp-inbox-wallet-dm"],
    relatedIdeaSlugs: ["onchain-intern", "ai-grant-hunter"],
    examples: [
      { name: "Neynar", url: "https://neynar.com" },
      { name: "XMTP", url: "https://xmtp.org" },
    ],
  }),
  idea({
    slug: "onchain-intern",
    title: "Onchain Intern",
    description:
      'An AI agent you assign tasks to like "find me 3 grants I qualify for and draft the applications."',
    overview:
      "A task-running agent that researches grants, drafts submissions, and queues onchain actions from natural-language briefs.",
    problem:
      "Solo builders spend days on grant research, form filling, and ecosystem ops instead of shipping product.",
    suggestedFeatures: [
      "Natural-language task inbox",
      "Grant and program matching",
      "Application draft generation",
      "Human approval before submit",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–6 weeks",
    group: "agentic",
    category: "ai",
    apiSlugs: ["coinbase-agentkit", "ollama", "supabase"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["agentkit", "onchain-agent-demo"],
    relatedIdeaSlugs: ["ai-grant-hunter", "agent-tip-jar"],
    examples: [{ name: "Gitcoin Grants", url: "https://grants.gitcoin.co" }],
  }),
  idea({
    slug: "ai-wallet-watcher",
    title: "AI Wallet Watcher",
    description:
      "Monitors a list of wallets and sends you a daily digest of what smart money is doing.",
    overview:
      "A watchlist service that labels wallets, tracks flows and positions, and summarizes notable moves in a daily brief.",
    problem:
      "Traders follow dozens of wallets manually but miss timely signals buried in raw on-chain data.",
    suggestedFeatures: [
      "Wallet watchlists and labels",
      "Swap and transfer alerts",
      "LLM daily digest email",
      "Smart-money heuristics",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "agentic",
    category: "analytics",
    apiSlugs: ["nansen", "dune", "alchemy", "ollama"],
    ecosystemSlugs: ["ethereum", "base", "solana"],
    relatedRecipeSlugs: ["defi-analytics-dashboard", "web3-wallet-analyzer"],
    relatedIdeaSlugs: ["ai-portfolio-manager", "wallet-crm"],
    examples: [
      { name: "Nansen", url: "https://www.nansen.ai" },
      { name: "Arkham", url: "https://www.arkhamintelligence.com" },
    ],
  }),
  idea({
    slug: "smart-signer",
    title: "Smart Signer",
    description:
      "AI reviews every transaction before you sign it and warns you in plain English what it actually does.",
    overview:
      "A browser or wallet extension layer that simulates txs, explains risks, and flags approvals, drains, and phishing patterns.",
    problem:
      "Users sign opaque calldata and unlimited approvals without understanding real-world impact until funds are gone.",
    suggestedFeatures: [
      "Transaction simulation",
      "Plain-English risk summary",
      "Approval and spender warnings",
      "Known scam contract blocklist",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–8 weeks",
    group: "agentic",
    category: "security",
    apiSlugs: ["privy", "alchemy", "ollama", "chainalysis"],
    ecosystemSlugs: ["ethereum", "base", "polygon"],
    relatedRecipeSlugs: ["onchain-commerce-shop"],
    relatedIdeaSlugs: ["smart-contract-risk-dashboard", "bug-bounty-platform"],
    examples: [
      { name: "Wallet Guard", url: "https://www.walletguard.app" },
      { name: "Fire", url: "https://www.fire.xyz" },
    ],
  }),

  // Social Apps
  idea({
    slug: "proof-of-ship",
    title: "Proof of Ship",
    description:
      "Builders log what they shipped each week, verified by GitHub commits, with a public leaderboard.",
    overview:
      "A builder accountability app that syncs GitHub activity, lets you annotate releases, and ranks weekly shipping streaks.",
    problem:
      "Indie builders lack a lightweight, verifiable record of consistent shipping visible to communities and employers.",
    suggestedFeatures: [
      "GitHub OAuth and commit sync",
      "Weekly ship log and notes",
      "Public leaderboard",
      "Streak and badge system",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "social",
    category: "social",
    apiSlugs: ["privy", "supabase"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["hey-social-app", "base-social-mini-app"],
    relatedIdeaSlugs: ["onchain-resume", "web3-product-hunt"],
    examples: [{ name: "Wakatime", url: "https://wakatime.com" }],
  }),
  idea({
    slug: "crypto-pen-pals",
    title: "Crypto Pen Pals",
    description:
      "Get matched with another builder in a different ecosystem, chat via XMTP, and share what you're building.",
    overview:
      "A matching service that pairs builders across ecosystems for async XMTP chats and optional onchain intro cards.",
    problem:
      "Builders in siloed ecosystems rarely meet peers elsewhere who could share patterns, intros, and feedback.",
    suggestedFeatures: [
      "Ecosystem-based matching",
      "XMTP encrypted chat",
      "Builder profile cards",
      "Opt-in match scheduling",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "social",
    category: "social",
    apiSlugs: ["xmtp", "privy", "farcaster"],
    ecosystemSlugs: ["ethereum", "base", "solana", "sui"],
    relatedRecipeSlugs: ["xmtp-inbox-wallet-dm", "chatter-xmtp-privy"],
    relatedIdeaSlugs: ["proof-of-ship", "hey-social-app"],
    examples: [{ name: "XMTP", url: "https://xmtp.org" }],
  }),
  idea({
    slug: "farcaster-wrapped",
    title: "Farcaster Wrapped",
    description:
      "Your year on Farcaster — casts, reactions, top followers, and onchain activity in a shareable card.",
    overview:
      "A seasonal recap generator that aggregates Farcaster social stats plus linked wallet activity into exportable graphics.",
    problem:
      "Users want Spotify-style recaps for their onchain social life but no simple tool composes casts and txs together.",
    suggestedFeatures: [
      "Farcaster stats aggregation",
      "Top casts and reactions",
      "Linked wallet highlights",
      "Shareable image export",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "social",
    category: "social",
    apiSlugs: ["farcaster", "alchemy", "dune"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["farcaster-mint-frame", "farcaster-mini-app-full-demo"],
    relatedIdeaSlugs: ["builder-roast", "onchain-resume"],
    examples: [{ name: "Spotify Wrapped", url: "https://www.spotify.com/wrapped" }],
  }),
  idea({
    slug: "builder-roast",
    title: "Builder Roast",
    description:
      "AI roasts your GitHub profile, wallet history, and Farcaster activity — shareable for fun.",
    overview:
      "A playful generator that pulls public builder signals and produces witty, shareable roast cards for social feeds.",
    problem:
      "Crypto Twitter loves personality-driven content but builders lack a fun, automated way to generate shareable roasts.",
    suggestedFeatures: [
      "GitHub stats ingestion",
      "Wallet and cast summaries",
      "LLM roast generation",
      "Shareable image cards",
    ],
    difficulty: "beginner",
    estimatedBuildTime: "1–2 weeks",
    group: "social",
    category: "social",
    apiSlugs: ["farcaster", "ollama", "alchemy"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["farcaster-mint-frame"],
    relatedIdeaSlugs: ["farcaster-wrapped", "proof-of-ship"],
    examples: [{ name: "Roast.ai", url: "https://roast.ai" }],
  }),

  // Utility Apps
  idea({
    slug: "rug-history",
    title: "Rug History",
    description:
      "Enter any wallet address and see every rug pull they were involved in, as victim or deployer.",
    overview:
      "A forensic dashboard that maps wallet relationships to known scam tokens, liquidity removals, and victim reports.",
    problem:
      "Investors cannot quickly see if a wallet has a history of deploying or promoting rugs before trusting a new project.",
    suggestedFeatures: [
      "Wallet rug involvement timeline",
      "Deployer vs victim tagging",
      "Token and liquidity events",
      "Community report submissions",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–8 weeks",
    group: "utility",
    category: "security",
    apiSlugs: ["dune", "alchemy", "chainalysis", "nansen"],
    ecosystemSlugs: ["ethereum", "base", "solana"],
    relatedRecipeSlugs: ["defi-analytics-dashboard"],
    relatedIdeaSlugs: ["smart-signer", "smart-contract-risk-dashboard"],
    examples: [{ name: "RugDoc", url: "https://rugdoc.io" }],
  }),
  idea({
    slug: "token-vesting-dashboard",
    title: "Token Vesting Dashboard",
    description:
      "Track all your vesting schedules, cliffs, and unlock dates across protocols in one view.",
    overview:
      "A portfolio utility that aggregates vesting contracts, cliffs, and unlock calendars across teams and protocols.",
    problem:
      "Contributors and investors juggle multiple vesting portals with no unified calendar or alert system.",
    suggestedFeatures: [
      "Multi-protocol vesting import",
      "Cliff and unlock calendar",
      "Email and push reminders",
      "Claim transaction shortcuts",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "utility",
    category: "analytics",
    apiSlugs: ["alchemy", "dune", "privy"],
    ecosystemSlugs: ["ethereum", "base", "arbitrum"],
    relatedRecipeSlugs: ["defi-analytics-dashboard", "portfolio-tracker"],
    relatedIdeaSlugs: ["personal-crypto-cfo", "ai-portfolio-manager"],
    examples: [{ name: "Magna", url: "https://www.magna.so" }],
  }),
  idea({
    slug: "onchain-receipts",
    title: "Onchain Receipts",
    description:
      "Beautiful shareable receipt cards for any onchain transaction — like Spotify Wrapped for trades.",
    overview:
      "Paste a tx hash and get a designed receipt card with amounts, protocols, and branding ready to post on social.",
    problem:
      "Traders and builders want to celebrate wins and milestones but onchain explorers are ugly for sharing.",
    suggestedFeatures: [
      "Tx hash to receipt parser",
      "Branded card templates",
      "PNG and OG image export",
      "Multi-chain support",
    ],
    difficulty: "beginner",
    estimatedBuildTime: "1–3 weeks",
    group: "utility",
    category: "analytics",
    apiSlugs: ["alchemy", "dune"],
    ecosystemSlugs: ["ethereum", "base", "solana"],
    relatedRecipeSlugs: ["farcaster-mint-frame"],
    relatedIdeaSlugs: ["farcaster-wrapped", "onchain-resume"],
    examples: [{ name: "Zapper", url: "https://zapper.xyz" }],
  }),
  idea({
    slug: "gas-time-machine",
    title: "Gas Time Machine",
    description:
      "Tells you the cheapest time of day and day of week to transact on any chain.",
    overview:
      "A gas analytics app that charts historical fee patterns and recommends optimal send windows per chain.",
    problem:
      "Users overpay gas because they transact at peak times without visibility into recurring cheap windows.",
    suggestedFeatures: [
      "Historical gas heatmaps",
      "Per-chain cheap window alerts",
      "Send-later scheduling tips",
      "L2 vs L1 comparison",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "utility",
    category: "infrastructure",
    apiSlugs: ["alchemy", "dune", "pimlico"],
    ecosystemSlugs: ["ethereum", "base", "polygon", "arbitrum"],
    relatedRecipeSlugs: ["hangman-onchain"],
    relatedIdeaSlugs: ["personal-crypto-cfo"],
    examples: [{ name: "Etherscan Gas Tracker", url: "https://etherscan.io/gastracker" }],
  }),

  // Payments Apps
  idea({
    slug: "crypto-allowance",
    title: "Crypto Allowance",
    description:
      "Parents set a weekly USDC allowance for kids; kids spend via a simple wallet interface.",
    overview:
      "A family payments app with parent-controlled USDC allowances, spend limits, and a kid-friendly wallet UI.",
    problem:
      "Parents want to teach kids money skills with crypto but lack safe, simple allowance tools with guardrails.",
    suggestedFeatures: [
      "Weekly USDC allowance rules",
      "Parent approval dashboard",
      "Kid spend wallet UI",
      "Spend category limits",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "payments-apps",
    category: "payments",
    apiSlugs: ["circle", "privy", "rain"],
    ecosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["onramp-demo-app", "payroll-dashboard"],
    relatedIdeaSlugs: ["stablecoin-payroll", "crypto-neobank"],
    examples: [{ name: "Greenlight", url: "https://greenlight.com" }],
  }),
  idea({
    slug: "freelancer-escrow",
    title: "Freelancer Escrow",
    description:
      "Client deposits funds; an agent releases them when a GitHub PR is merged or a milestone is verified.",
    overview:
      "Escrow for freelancers where smart contracts or agents hold USDC until GitHub or milestone proofs clear.",
    problem:
      "Freelancers and clients lack trustless payment release tied to verifiable deliverables like merged PRs.",
    suggestedFeatures: [
      "Escrow deposit flow",
      "GitHub PR merge verification",
      "Milestone checklist releases",
      "Dispute pause controls",
    ],
    difficulty: "advanced",
    estimatedBuildTime: "4–8 weeks",
    group: "payments-apps",
    category: "payments",
    apiSlugs: ["privy", "alchemy", "xmtp"],
    ecosystemSlugs: ["base", "ethereum", "solana"],
    relatedRecipeSlugs: ["solanahub-freelance-marketplace", "automated-mass-payouts"],
    relatedIdeaSlugs: ["stablecoin-payroll", "open-source-bounty-board"],
    examples: [{ name: "Request Finance", url: "https://www.request.finance" }],
  }),
  idea({
    slug: "tip-link-generator",
    title: "Tip Link Generator",
    description:
      "Create a personal tip link, share it anywhere, and receive crypto from anyone without them needing a wallet.",
    overview:
      "A hosted tip page with ENS or short links, optional email claim, and support for multiple tokens and chains.",
    problem:
      "Creators want one link to receive tips but onboarding tippers with wallets kills conversion.",
    suggestedFeatures: [
      "Personal tip page builder",
      "Multi-token and chain support",
      "Guest checkout / email claim",
      "Tip notifications",
    ],
    difficulty: "beginner",
    estimatedBuildTime: "1–3 weeks",
    group: "payments-apps",
    category: "payments",
    apiSlugs: ["privy", "coinbase-agentkit", "circle"],
    ecosystemSlugs: ["base", "ethereum", "solana"],
    relatedRecipeSlugs: ["solana-pay-store", "onchain-commerce-shop"],
    relatedIdeaSlugs: ["agent-tip-jar", "crypto-allowance"],
    examples: [
      { name: "Coinbase Commerce", url: "https://www.coinbase.com/commerce" },
      { name: "Gitcoin Tip", url: "https://gitcoin.co" },
    ],
  }),

  // Discovery Apps
  idea({
    slug: "dead-project-museum",
    title: "Dead Project Museum",
    description:
      "Browse and learn from failed Web3 projects — what went wrong, what was built, and what was learned.",
    overview:
      "A museum-style archive of sunset protocols with postmortems, repo links, and lessons for future builders.",
    problem:
      "The industry repeats the same mistakes because failed project knowledge is scattered and not curated.",
    suggestedFeatures: [
      "Project graveyard profiles",
      "Failure cause taxonomy",
      "Repo and docs archive",
      "Community postmortem submissions",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "discovery-apps",
    category: "discovery",
    apiSlugs: ["supabase", "dune"],
    ecosystemSlugs: ["ethereum", "base", "solana"],
    relatedRecipeSlugs: [],
    relatedIdeaSlugs: ["startup-graveyard", "web3-product-hunt"],
    examples: [{ name: "Killed by Google", url: "https://killedbygoogle.com" }],
  }),
  idea({
    slug: "ecosystem-job-board",
    title: "Ecosystem Job Board",
    description:
      "Jobs filtered by ecosystem, tech stack, and whether the company is open source.",
    overview:
      "A Web3 job board with ecosystem tags, stack filters, and OSS badges for protocol and tooling teams.",
    problem:
      "Developers hunt jobs across Discord and Twitter with no unified board filtered by chain and stack.",
    suggestedFeatures: [
      "Ecosystem and stack filters",
      "OSS company badge",
      "Apply via wallet or email",
      "Salary and remote tags",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "3–5 weeks",
    group: "discovery-apps",
    category: "discovery",
    apiSlugs: ["supabase", "privy"],
    ecosystemSlugs: ["ethereum", "base", "solana", "sui"],
    relatedRecipeSlugs: ["hey-social-app"],
    relatedIdeaSlugs: ["grant-discovery-platform", "internet-opportunities-feed"],
    examples: [
      { name: "Cryptocurrency Jobs", url: "https://cryptocurrencyjobs.co" },
      { name: "Web3 Career", url: "https://web3.career" },
    ],
  }),
  idea({
    slug: "api-changelog-feed",
    title: "API Changelog Feed",
    description:
      "Follow your favorite Web3 APIs and get notified when they ship new endpoints or break changes.",
    overview:
      "A subscription feed that tracks API docs, GitHub releases, and breaking changes for protocols you depend on.",
    problem:
      "Teams discover API breaking changes in production because no one monitors dozens of provider changelogs.",
    suggestedFeatures: [
      "API watchlists",
      "Changelog and release scraping",
      "Breaking change alerts",
      "Slack and email notifications",
    ],
    difficulty: "intermediate",
    estimatedBuildTime: "2–4 weeks",
    group: "discovery-apps",
    category: "discovery",
    apiSlugs: ["supabase", "ollama"],
    ecosystemSlugs: ["ethereum", "base", "solana"],
    relatedRecipeSlugs: ["web3-stack-generator"],
    relatedIdeaSlugs: ["web3-stack-generator", "internet-opportunities-feed"],
    examples: [{ name: "GitHub Releases", url: "https://github.com" }],
  }),
];
