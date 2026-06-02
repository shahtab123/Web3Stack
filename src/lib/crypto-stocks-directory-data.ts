import { defineCryptoStock } from "./crypto-stocks-builder-defaults";

export const cryptoStocksDirectory = [
  // Exchanges
  defineCryptoStock({
    ticker: "coin",
    name: "Coinbase",
    displayTicker: "COIN",
    category: "exchanges",
    description: "US-regulated crypto exchange and developer platform.",
    exposureSummary:
      "Exchange revenue plus CDP, Base L2, and onchain developer tools.",
    overview:
      "Coinbase operates a major US exchange and ships wallet, payment, and onchain app tooling — especially on Base.",
    cryptoActivities: [
      "Retail and institutional exchange",
      "Custody and staking",
      "Base L2 and developer platform",
    ],
    cryptoProducts: ["CDP", "AgentKit", "OnchainKit", "Base"],
    developerResources: [
      {
        label: "Coinbase Developer Platform",
        url: "https://www.coinbase.com/developer-platform",
        type: "api",
      },
      { label: "OnchainKit", url: "https://onchainkit.xyz", type: "sdk" },
      { label: "Base Docs", url: "https://docs.base.org", type: "docs" },
    ],
    relatedApiSlugs: ["alchemy", "circle", "privy"],
    relatedEcosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["wallet-login-system", "base-social-mini-app"],
    relatedTickers: ["hood", "etoro", "bakkt"],
    website: "https://www.coinbase.com",
  }),
  defineCryptoStock({
    ticker: "hood",
    name: "Robinhood",
    displayTicker: "HOOD",
    category: "exchanges",
    description: "Retail brokerage with integrated crypto trading.",
    exposureSummary:
      "Commission-free crypto trading inside a mainstream brokerage app.",
    overview:
      "Robinhood brings crypto to retail users alongside equities — a reference for consumer trading UX.",
    cryptoActivities: [
      "Retail crypto trading",
      "Crypto transfers",
      "Unified brokerage experience",
    ],
    relatedTickers: ["coin", "etoro", "bakkt"],
    website: "https://robinhood.com",
  }),
  defineCryptoStock({
    ticker: "etoro",
    name: "eToro",
    displayTicker: "ETOR",
    category: "exchanges",
    description: "Social trading platform with crypto and copy trading.",
    exposureSummary:
      "Multi-asset platform with crypto trading and social investing features.",
    overview:
      "eToro combines social trading with crypto access for a global retail audience.",
    cryptoActivities: [
      "Retail crypto trading",
      "Copy trading",
      "Multi-asset brokerage",
    ],
    relatedTickers: ["coin", "hood", "bakkt"],
    website: "https://www.etoro.com",
  }),
  defineCryptoStock({
    ticker: "bakkt",
    name: "Bakkt",
    displayTicker: "BKKT",
    category: "exchanges",
    description: "Digital asset platform for institutions and consumers.",
    exposureSummary:
      "Crypto custody, trading, and loyalty/rewards infrastructure.",
    overview:
      "Bakkt builds crypto rails for partners including loyalty programs and institutional custody.",
    cryptoActivities: [
      "Crypto custody and trading",
      "Loyalty and rewards crypto integration",
      "Institutional partnerships",
    ],
    relatedTickers: ["coin", "hood", "etoro"],
    website: "https://www.bakkt.com",
  }),

  // Bitcoin Treasury
  defineCryptoStock({
    ticker: "strategy",
    name: "Strategy",
    displayTicker: "MSTR",
    category: "bitcoin-treasury",
    description: "Largest corporate Bitcoin treasury holder.",
    exposureSummary:
      "Corporate balance sheet strategy centered on Bitcoin accumulation.",
    overview:
      "Strategy (formerly MicroStrategy) is the benchmark public company for corporate BTC treasury adoption.",
    cryptoActivities: [
      "Corporate Bitcoin holdings",
      "Regular BTC purchase disclosures",
      "Bitcoin-backed financing",
    ],
    relatedTickers: ["metaplanet", "smlr", "blockchain-group"],
    website: "https://www.strategy.com",
  }),
  defineCryptoStock({
    ticker: "metaplanet",
    name: "Metaplanet",
    displayTicker: "MTPLF",
    marketSymbol: "MTPLF",
    category: "bitcoin-treasury",
    description: "Japanese public company adopting a Bitcoin treasury strategy.",
    exposureSummary:
      "Asia-Pacific corporate BTC treasury model with public disclosures.",
    overview:
      "Metaplanet is a Tokyo-listed company pursuing a Bitcoin balance sheet strategy similar to US treasury peers.",
    cryptoActivities: [
      "Corporate Bitcoin purchases",
      "Public treasury disclosures",
      "BTC-focused capital strategy",
    ],
    relatedTickers: ["strategy", "smlr", "blockchain-group"],
    website: "https://metaplanet.jp",
  }),
  defineCryptoStock({
    ticker: "smlr",
    name: "Semler Scientific",
    displayTicker: "SMLR",
    category: "bitcoin-treasury",
    listingStatus: "delisted",
    listingNote:
      "Merged into Strive (ASST) and delisted from Nasdaq in January 2026.",
    description: "Former public Bitcoin treasury company (now part of Strive).",
    exposureSummary:
      "Corporate BTC treasury model before acquisition by Strive (ASST).",
    overview:
      "Semler Scientific adopted a Bitcoin treasury strategy as a secondary public-company BTC reference. It merged into Strive in January 2026 and SMLR no longer trades.",
    cryptoActivities: [
      "Corporate Bitcoin purchases",
      "Treasury strategy updates",
      "Public BTC holding disclosures",
    ],
    relatedTickers: ["strategy", "metaplanet", "blockchain-group"],
    website: "https://www.semlerscientific.com",
  }),
  defineCryptoStock({
    ticker: "blockchain-group",
    name: "The Blockchain Group",
    displayTicker: "ALTBG",
    marketSymbol: "ALCPB.PA",
    category: "bitcoin-treasury",
    description: "European company with a Bitcoin treasury strategy.",
    exposureSummary:
      "EU-listed corporate BTC accumulation and disclosure model.",
    overview:
      "The Blockchain Group is a Paris-listed company building a Bitcoin treasury on the European public markets.",
    cryptoActivities: [
      "Corporate Bitcoin accumulation",
      "European treasury disclosures",
      "BTC-focused corporate strategy",
    ],
    relatedTickers: ["strategy", "metaplanet", "smlr"],
    website: "https://www.theblockchaingroup.com",
  }),

  // Mining
  defineCryptoStock({
    ticker: "mara",
    name: "Marathon Digital",
    displayTicker: "MARA",
    category: "mining",
    description: "Large-scale Bitcoin mining operator.",
    exposureSummary: "Hash rate growth and BTC production as core metrics.",
    overview:
      "Marathon Digital operates significant Bitcoin mining infrastructure with public production reporting.",
    cryptoActivities: [
      "Self-mined Bitcoin production",
      "Mining fleet expansion",
      "Energy partnerships",
    ],
    relatedTickers: ["riot", "clsk", "bitf"],
    website: "https://www.mara.com",
  }),
  defineCryptoStock({
    ticker: "riot",
    name: "Riot Platforms",
    displayTicker: "RIOT",
    category: "mining",
    description: "Bitcoin mining and data center operator.",
    exposureSummary:
      "Mining production and data center operations with public metrics.",
    overview:
      "Riot Platforms runs large Bitcoin mining sites with regular hash rate and production updates.",
    cryptoActivities: [
      "Bitcoin mining at scale",
      "Data center infrastructure",
      "Production reporting",
    ],
    relatedTickers: ["mara", "clsk", "corz"],
    website: "https://www.riotplatforms.com",
  }),
  defineCryptoStock({
    ticker: "clsk",
    name: "CleanSpark",
    displayTicker: "CLSK",
    category: "mining",
    description: "Bitcoin mining company focused on energy strategy.",
    exposureSummary:
      "Mining operations with emphasis on power costs and fleet efficiency.",
    overview:
      "CleanSpark operates Bitcoin mining assets with public energy and production disclosures.",
    cryptoActivities: [
      "Bitcoin mining operations",
      "Energy management",
      "Fleet expansion",
    ],
    relatedTickers: ["mara", "riot", "hut"],
    website: "https://www.cleanspark.com",
  }),
  defineCryptoStock({
    ticker: "bitf",
    name: "Bitfarms",
    displayTicker: "BITF",
    category: "mining",
    description: "Vertically integrated Bitcoin mining company.",
    exposureSummary:
      "Multi-site mining production and hash rate as primary drivers.",
    overview:
      "Bitfarms operates global mining farms with public hash rate reporting.",
    cryptoActivities: [
      "Multi-site mining operations",
      "Hash rate reporting",
      "Facility management",
    ],
    relatedTickers: ["mara", "clsk", "btdr"],
    website: "https://bitfarms.com",
  }),
  defineCryptoStock({
    ticker: "hut",
    name: "Hut 8",
    displayTicker: "HUT",
    category: "mining",
    description: "Bitcoin mining and digital infrastructure company.",
    exposureSummary:
      "Mining plus AI/cloud infrastructure diversification.",
    overview:
      "Hut 8 combines Bitcoin mining with digital infrastructure and energy assets.",
    cryptoActivities: [
      "Bitcoin mining",
      "Digital infrastructure",
      "Energy and hosting assets",
    ],
    relatedTickers: ["mara", "corz", "apld"],
    website: "https://www.hut8.com",
  }),
  defineCryptoStock({
    ticker: "corz",
    name: "Core Scientific",
    displayTicker: "CORZ",
    category: "mining",
    description: "Bitcoin mining and HPC infrastructure provider.",
    exposureSummary:
      "Mining operations plus high-performance compute hosting.",
    overview:
      "Core Scientific runs large-scale mining and data center infrastructure for digital assets.",
    cryptoActivities: [
      "Bitcoin mining",
      "HPC hosting",
      "Infrastructure operations",
    ],
    relatedTickers: ["riot", "hut", "apld"],
    website: "https://corescientific.com",
  }),
  defineCryptoStock({
    ticker: "btdr",
    name: "Bitdeer",
    displayTicker: "BTDR",
    category: "mining",
    description: "Bitcoin mining and cloud hash rate platform.",
    exposureSummary:
      "Self-mining plus hash rate marketplace and infrastructure.",
    overview:
      "Bitdeer operates mining infrastructure and sells cloud hash rate to third parties.",
    cryptoActivities: [
      "Self-mining operations",
      "Cloud hash rate platform",
      "Mining infrastructure",
    ],
    relatedTickers: ["bitf", "cifr", "mara"],
    website: "https://www.bitdeer.com",
  }),
  defineCryptoStock({
    ticker: "cifr",
    name: "Cipher Mining",
    displayTicker: "CIFR",
    category: "mining",
    description: "US-focused Bitcoin mining company.",
    exposureSummary:
      "Mining production tied to US power markets and fleet growth.",
    overview:
      "Cipher Mining develops and operates Bitcoin mining data centers in the United States.",
    cryptoActivities: [
      "US Bitcoin mining sites",
      "Fleet expansion",
      "Production reporting",
    ],
    relatedTickers: ["mara", "riot", "btdr"],
    website: "https://www.ciphermining.com",
  }),

  // Stablecoins & Payments
  defineCryptoStock({
    ticker: "circle",
    name: "Circle",
    displayTicker: "Private",
    category: "stablecoins-payments",
    description: "Issuer of USDC stablecoin.",
    exposureSummary:
      "Stablecoin issuance and programmable wallet infrastructure.",
    overview:
      "Circle issues USDC and ships APIs for treasuries, payouts, and programmable wallets.",
    cryptoActivities: [
      "USDC issuance",
      "Cross-chain USDC infrastructure",
      "Programmable wallets and treasury APIs",
    ],
    cryptoProducts: ["USDC", "CCTP", "Circle Mint", "Wallet APIs"],
    developerResources: [
      {
        label: "Circle Developer Docs",
        url: "https://developers.circle.com",
        type: "docs",
      },
      {
        label: "USDC API",
        url: "https://developers.circle.com/stablecoins/docs",
        type: "api",
      },
    ],
    relatedApiSlugs: ["circle", "stripe", "plaid"],
    relatedEcosystemSlugs: ["base", "ethereum"],
    relatedRecipeSlugs: ["crypto-neobank", "payroll-app"],
    relatedTickers: ["block", "pypl"],
    website: "https://www.circle.com",
    isPrivate: true,
  }),
  defineCryptoStock({
    ticker: "block",
    name: "Block",
    displayTicker: "XYZ",
    category: "stablecoins-payments",
    description: "Payments company with Bitcoin and crypto products.",
    exposureSummary:
      "Cash App Bitcoin features and open-source Bitcoin development.",
    overview:
      "Block integrates Bitcoin into Cash App and funds open-source Bitcoin tooling via Spiral.",
    cryptoActivities: [
      "Cash App Bitcoin buying and selling",
      "Spiral open-source Bitcoin initiatives",
      "Lightning research",
    ],
    cryptoProducts: ["Cash App Bitcoin", "Spiral OSS", "Lightning tooling"],
    relatedTickers: ["pypl", "circle", "coin"],
    website: "https://block.xyz",
  }),
  defineCryptoStock({
    ticker: "pypl",
    name: "PayPal",
    displayTicker: "PYPL",
    category: "stablecoins-payments",
    description: "Global payments platform with crypto features.",
    exposureSummary:
      "Consumer crypto buy/hold/transfer plus PYUSD stablecoin.",
    overview:
      "PayPal and Venmo embed crypto into mainstream payment flows for hundreds of millions of users.",
    cryptoActivities: [
      "PayPal and Venmo crypto",
      "PYUSD stablecoin",
      "Merchant checkout integrations",
    ],
    cryptoProducts: ["PayPal Crypto", "Venmo Crypto", "PYUSD"],
    relatedTickers: ["block", "circle"],
    website: "https://www.paypal.com",
  }),

  // Crypto Financial Services
  defineCryptoStock({
    ticker: "glxy",
    name: "Galaxy Digital",
    displayTicker: "GLXY",
    category: "crypto-financial-services",
    description: "Digital asset financial services and investment firm.",
    exposureSummary:
      "Institutional trading, asset management, and venture across crypto.",
    overview:
      "Galaxy Digital provides institutional crypto services and invests across the digital asset ecosystem.",
    cryptoActivities: [
      "Institutional trading and lending",
      "Asset management",
      "Venture and research",
    ],
    relatedTickers: ["deft", "coinshares"],
    website: "https://www.galaxy.com",
  }),
  defineCryptoStock({
    ticker: "deft",
    name: "DeFi Technologies",
    displayTicker: "DEFT",
    marketSymbol: "DEFT",
    category: "crypto-financial-services",
    description: "Public company bridging TradFi and DeFi exposure.",
    exposureSummary:
      "DeFi-focused investment products and validator infrastructure.",
    overview:
      "DeFi Technologies builds public-market access to DeFi yields and blockchain infrastructure.",
    cryptoActivities: [
      "DeFi yield products",
      "Validator node operations",
      "Digital asset treasury management",
    ],
    relatedTickers: ["glxy", "coinshares"],
    website: "https://defi.tech",
  }),
  defineCryptoStock({
    ticker: "coinshares",
    name: "CoinShares",
    displayTicker: "CNSRF",
    marketSymbol: "CNSRF",
    category: "crypto-financial-services",
    description: "Digital asset investment and research firm.",
    exposureSummary:
      "Crypto ETPs, asset management, and institutional research.",
    overview:
      "CoinShares is a major European digital asset manager with ETPs and research products.",
    cryptoActivities: [
      "Crypto ETP issuance",
      "Asset management",
      "Institutional research",
    ],
    relatedTickers: ["glxy", "deft", "blk"],
    website: "https://coinshares.com",
  }),

  // Infrastructure & Blockchain
  defineCryptoStock({
    ticker: "nvve",
    name: "Nuvve Holding",
    displayTicker: "NVVE",
    category: "infrastructure-blockchain",
    description: "Vehicle-to-grid and energy infrastructure company.",
    exposureSummary:
      "Energy infrastructure with grid integration — adjacent to mining power markets.",
    overview:
      "Nuvve builds V2G energy infrastructure relevant to power markets tied to compute and mining.",
    cryptoActivities: [
      "Vehicle-to-grid infrastructure",
      "Energy aggregation",
      "Grid services",
    ],
    relatedTickers: ["btcs", "apld"],
    website: "https://nuvve.com",
  }),
  defineCryptoStock({
    ticker: "btcs",
    name: "BTCS",
    displayTicker: "BTCS",
    category: "infrastructure-blockchain",
    description: "Blockchain infrastructure and Ethereum staking company.",
    exposureSummary:
      "Validator operations and blockchain infrastructure exposure.",
    overview:
      "BTCS operates blockchain infrastructure including Ethereum validator and staking services.",
    cryptoActivities: [
      "Ethereum validator operations",
      "Staking infrastructure",
      "Blockchain development",
    ],
    relatedTickers: ["nvve", "apld"],
    website: "https://www.btcs.com",
  }),
  defineCryptoStock({
    ticker: "apld",
    name: "Applied Digital",
    displayTicker: "APLD",
    category: "infrastructure-blockchain",
    description: "Data center infrastructure for AI and compute workloads.",
    exposureSummary:
      "High-performance data centers used for AI and digital asset compute.",
    overview:
      "Applied Digital builds power-dense data centers increasingly relevant to AI and crypto compute.",
    cryptoActivities: [
      "AI and HPC data centers",
      "Power infrastructure",
      "Hosting partnerships",
    ],
    relatedTickers: ["hut", "corz", "nvve"],
    website: "https://applieddigital.com",
  }),

  // ETFs
  defineCryptoStock({
    ticker: "blk",
    name: "BlackRock",
    displayTicker: "BLK",
    category: "etfs",
    description: "Global asset manager behind the iShares Bitcoin Trust (IBIT).",
    exposureSummary:
      "Largest spot Bitcoin ETF issuer via IBIT and institutional crypto products.",
    overview:
      "BlackRock brought spot Bitcoin ETF access mainstream through IBIT — a key institutional on-ramp.",
    cryptoActivities: [
      "iShares Bitcoin Trust (IBIT)",
      "Institutional crypto product research",
      "Tokenization initiatives",
    ],
    cryptoProducts: ["IBIT", "Institutional crypto research"],
    relatedTickers: ["ark", "bitwise", "coinshares"],
    website: "https://www.blackrock.com",
  }),
  defineCryptoStock({
    ticker: "fidelity",
    name: "Fidelity Investments",
    displayTicker: "FBTC",
    marketSymbol: "FBTC",
    category: "etfs",
    description: "Asset manager behind the Fidelity Wise Origin Bitcoin Fund.",
    exposureSummary:
      "Spot Bitcoin ETF exposure via FBTC — Fidelity itself is privately held.",
    overview:
      "Fidelity is a privately held asset manager; FBTC is its flagship spot Bitcoin ETF for tracking exposure.",
    cryptoActivities: [
      "Fidelity Wise Origin Bitcoin Fund (FBTC)",
      "Crypto custody for institutions",
      "Digital asset research",
    ],
    cryptoProducts: ["FBTC", "Fidelity Crypto custody"],
    relatedTickers: ["blk", "ark", "bitwise"],
    website: "https://www.fidelity.com",
  }),
  defineCryptoStock({
    ticker: "ark",
    name: "ARK Invest",
    displayTicker: "ARKB",
    marketSymbol: "ARKB",
    category: "etfs",
    description: "Investment manager with spot Bitcoin ETF products.",
    exposureSummary:
      "Spot Bitcoin ETF exposure via ARKB and broader ARK crypto research.",
    overview:
      "ARK Invest offers crypto exposure through ETFs like ARKB while publishing active crypto research.",
    cryptoActivities: [
      "ARK 21Shares Bitcoin ETF (ARKB)",
      "Crypto research and commentary",
      "Thematic digital asset investing",
    ],
    cryptoProducts: ["ARKB", "ARK crypto research"],
    relatedTickers: ["blk", "bitwise", "fidelity"],
    website: "https://ark-invest.com",
  }),
  defineCryptoStock({
    ticker: "bitwise",
    name: "Bitwise Asset Management",
    displayTicker: "BITB",
    marketSymbol: "BITB",
    category: "etfs",
    description: "Crypto asset manager behind spot Bitcoin ETF products.",
    exposureSummary:
      "Spot Bitcoin ETF exposure via BITB and crypto index products.",
    overview:
      "Bitwise offers regulated crypto fund and ETF products including the Bitwise Bitcoin ETF (BITB).",
    cryptoActivities: [
      "Bitwise Bitcoin ETF (BITB)",
      "Crypto index funds",
      "Institutional research",
    ],
    cryptoProducts: ["BITB", "Crypto index products"],
    relatedTickers: ["blk", "ark", "fidelity"],
    website: "https://bitwiseinvestments.com",
  }),
];
