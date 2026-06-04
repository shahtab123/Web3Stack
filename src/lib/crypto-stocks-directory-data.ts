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
    relatedTickers: ["gemini", "bullish", "hood", "etoro", "bakkt"],
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
  defineCryptoStock({
    ticker: "gemini",
    name: "Gemini Space Station",
    displayTicker: "GEMI",
    category: "exchanges",
    description:
      "Winklevoss-founded crypto exchange — newly public on Nasdaq (Sep 2025).",
    exposureSummary:
      "Regulated US exchange and custody with fresh public-market listing.",
    overview:
      "Gemini is the Winklevoss twins' US crypto exchange. GEMI began trading on Nasdaq in September 2025, giving builders a newly listed exchange peer alongside COIN and HOOD.",
    cryptoActivities: [
      "Retail and institutional crypto trading",
      "Custody and staking",
      "Public-market exchange operator",
    ],
    relatedTickers: ["coin", "hood", "bullish"],
    website: "https://www.gemini.com",
    listingNote: "Listed on Nasdaq, September 2025 (GEMI).",
  }),
  defineCryptoStock({
    ticker: "bullish",
    name: "Bullish",
    displayTicker: "BLSH",
    category: "exchanges",
    description:
      "Institutional crypto exchange and CoinDesk parent — NYSE IPO Aug 2025.",
    exposureSummary:
      "Institutional spot and derivatives exchange plus CoinDesk media and data.",
    overview:
      "Bullish (NYSE: BLSH) went public in August 2025 with a strong first-day pop. It runs an institutional-focused exchange and owns CoinDesk indices, data, and media — a full-stack market infrastructure play.",
    cryptoActivities: [
      "Institutional spot and derivatives trading",
      "CoinDesk media, indices, and market data",
      "Regulated crypto market infrastructure",
    ],
    cryptoProducts: ["Bullish Exchange", "CoinDesk", "CoinDesk Indices"],
    relatedTickers: ["coin", "gemini", "glxy"],
    website: "https://www.bullish.com",
    listingNote: "NYSE IPO August 2025 (BLSH).",
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
    relatedTickers: ["xxi", "asst", "metaplanet", "smlr", "gme", "tsla"],
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
    relatedTickers: ["strategy", "xxi", "asst", "smlr", "blockchain-group"],
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
    relatedTickers: ["asst", "strategy", "metaplanet", "blockchain-group"],
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
  defineCryptoStock({
    ticker: "xxi",
    name: "Twenty One Capital",
    displayTicker: "XXI",
    category: "bitcoin-treasury",
    description:
      "NYSE Bitcoin treasury company — 43,514 BTC, backed by Tether and Bitfinex.",
    exposureSummary:
      "Large corporate BTC treasury with Tether and Bitfinex strategic backing.",
    overview:
      "Twenty One Capital (NYSE: XXI) listed in December 2025 as a major Bitcoin treasury vehicle with 43,514 BTC on its balance sheet, backed by Tether and Bitfinex — one of the largest newly public BTC treasury names.",
    cryptoActivities: [
      "Corporate Bitcoin treasury accumulation",
      "Public BTC holding disclosures",
      "Strategic backing from Tether and Bitfinex",
    ],
    relatedTickers: ["strategy", "asst", "gme", "tsla"],
    website: "https://www.twentyonecapital.com",
    listingNote: "Listed on NYSE, December 2025 (XXI).",
  }),
  defineCryptoStock({
    ticker: "asst",
    name: "Strive Asset Management",
    displayTicker: "ASST",
    category: "bitcoin-treasury",
    description:
      "Bitcoin treasury firm co-founded by Vivek Ramaswamy — 13,678 BTC.",
    exposureSummary:
      "Active corporate BTC treasury after Semler Scientific merger (Jan 2026).",
    overview:
      "Strive (NASDAQ: ASST) is a Bitcoin treasury company co-founded by Vivek Ramaswamy, holding 13,678 BTC. It absorbed Semler Scientific (SMLR) in January 2026 and continues the public-market BTC accumulation playbook.",
    cryptoActivities: [
      "Corporate Bitcoin purchases",
      "Treasury strategy and disclosures",
      "M&A of Bitcoin treasury peers",
    ],
    relatedTickers: ["strategy", "xxi", "smlr", "gme"],
    website: "https://www.strive.com",
    listingNote: "Semler Scientific (SMLR) merged into Strive, January 2026.",
  }),
  defineCryptoStock({
    ticker: "gme",
    name: "GameStop",
    displayTicker: "GME",
    category: "bitcoin-treasury",
    description:
      "Retail company with $500M+ Bitcoin purchases in 2025.",
    exposureSummary:
      "Meme-stock retailer evolving into a crypto treasury narrative.",
    overview:
      "GameStop (NYSE: GME) bought more than $500M of Bitcoin in 2025, reframing the retailer as a crypto treasury story alongside Strategy and other corporate BTC holders.",
    cryptoActivities: [
      "Corporate Bitcoin purchases",
      "Treasury allocation disclosures",
      "Retail + digital asset crossover narrative",
    ],
    relatedTickers: ["strategy", "xxi", "asst", "tsla"],
    website: "https://www.gamestop.com",
  }),
  defineCryptoStock({
    ticker: "tsla",
    name: "Tesla",
    displayTicker: "TSLA",
    category: "bitcoin-treasury",
    description:
      "Major corporate Bitcoin holder — 11,509 BTC on balance sheet.",
    exposureSummary:
      "Large-cap industrial with material BTC holdings reported at fair value.",
    overview:
      "Tesla (NASDAQ: TSLA) holds 11,509 BTC on its balance sheet and reports crypto at fair market value since 2025 — a mainstream corporate treasury reference for builders tracking public BTC exposure.",
    cryptoActivities: [
      "Corporate Bitcoin holdings",
      "Fair-value BTC accounting disclosures",
      "Payments and product ecosystem (adjacent)",
    ],
    relatedTickers: ["strategy", "xxi", "asst", "gme"],
    website: "https://www.tesla.com",
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
    relatedTickers: ["abtc", "mara", "corz", "apld"],
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
  defineCryptoStock({
    ticker: "wulf",
    name: "TeraWulf",
    displayTicker: "WULF",
    category: "mining",
    description:
      "AI-oriented Bitcoin miner with strong performance in prior downturns.",
    exposureSummary:
      "Zero-carbon mining plus AI/HPC hosting expansion.",
    overview:
      "TeraWulf (NASDAQ: WULF) operates Bitcoin mining with a focus on sustainable power and AI-oriented compute — often cited as a resilient miner through prior market downturns.",
    cryptoActivities: [
      "Bitcoin mining operations",
      "AI and HPC hosting partnerships",
      "Renewable and low-carbon power strategy",
    ],
    relatedTickers: ["iren", "hut", "mara", "riot"],
    website: "https://www.terawulf.com",
  }),
  defineCryptoStock({
    ticker: "iren",
    name: "Iris Energy",
    displayTicker: "IREN",
    category: "mining",
    description:
      "AI and Bitcoin mining operator — standout return in the 2025–2026 cycle.",
    exposureSummary:
      "Dual AI + Bitcoin mining growth with strong recent market performance.",
    overview:
      "Iris Energy (NASDAQ: IREN) combines Bitcoin mining with AI data center expansion and was among the top-performing mining names in the 2025–2026 cycle (+368% cited return).",
    cryptoActivities: [
      "Bitcoin mining at scale",
      "AI data center buildout",
      "Renewable-powered infrastructure",
    ],
    relatedTickers: ["wulf", "corz", "apld", "mara"],
    website: "https://www.irisenergy.co",
  }),
  defineCryptoStock({
    ticker: "abtc",
    name: "American Bitcoin",
    displayTicker: "ABTC",
    category: "mining",
    description:
      "Hut 8 majority-owned mining and BTC accumulation platform — Nasdaq Sep 2025.",
    exposureSummary:
      "Mining plus disciplined BTC accumulation via public Nasdaq vehicle.",
    overview:
      "American Bitcoin (NASDAQ: ABTC) began trading in September 2025 after merging with Gryphon. It is a majority-owned Hut 8 subsidiary combining scaled mining with Bitcoin accumulation strategies.",
    cryptoActivities: [
      "Self-mined Bitcoin production",
      "Corporate BTC accumulation",
      "Public-market mining + treasury hybrid model",
    ],
    relatedTickers: ["hut", "mara", "wulf", "iren"],
    website: "https://www.abtc.com",
    listingNote: "Nasdaq listing September 2025; majority-owned by Hut 8.",
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
    relatedApiSlugs: ["circle", "stripe", "privy"],
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
    relatedTickers: ["bitgo", "bullish", "deft", "coinshares"],
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
  defineCryptoStock({
    ticker: "bitgo",
    name: "BitGo",
    displayTicker: "Private",
    category: "crypto-financial-services",
    description:
      "Institutional custody and regulated staking — S-1 filed late 2025, IPO expected 2026.",
    exposureSummary:
      "Qualified custody, wallets, and staking for institutions pre-IPO.",
    overview:
      "BitGo is a leading institutional digital asset custodian with regulated staking. It filed an S-1 in late 2025 and is targeting a 2026 IPO — a key infrastructure name before it trades publicly.",
    cryptoActivities: [
      "Institutional digital asset custody",
      "Regulated staking services",
      "Wallet and treasury infrastructure",
    ],
    relatedTickers: ["glxy", "coin", "cantor"],
    website: "https://www.bitgo.com",
    isPrivate: true,
    listingNote: "Filed S-1 late 2025; IPO targeting 2026.",
  }),
  defineCryptoStock({
    ticker: "cantor",
    name: "Cantor Fitzgerald",
    displayTicker: "Private",
    category: "crypto-financial-services",
    description:
      "TradFi investment bank embedded in crypto via Twenty One Capital SPAC.",
    exposureSummary:
      "Capital markets and SPAC sponsorship for Bitcoin treasury listings.",
    overview:
      "Cantor Fitzgerald is a traditional finance firm deeply involved in crypto capital markets — notably as a sponsor and advisor on the Twenty One Capital (XXI) SPAC that brought a major BTC treasury to the NYSE.",
    cryptoActivities: [
      "SPAC and capital markets advisory",
      "Crypto treasury deal sponsorship",
      "Institutional distribution partnerships",
    ],
    relatedTickers: ["xxi", "glxy", "bitgo"],
    website: "https://www.cantor.com",
    isPrivate: true,
    listingNote: "Privately held; key sponsor of Twenty One Capital (XXI) listing.",
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
