import type { IntelPostCatalogEntry } from "./intel-posts-types";

/** Curated bookmark collection — URLs only, no rewritten content. */
export const intelPostsCatalog: IntelPostCatalogEntry[] = [
  {
    platform: "x",
    postUrl: "https://x.com/MelchBD/status/2061510995550343482",
    topics: ["startup-ideas", "apis"],
    createdAt: "2026-06-01T12:00:00Z",
  },
  {
    platform: "x",
    postUrl: "https://x.com/MonkeFoundry/status/2061505228349075905",
    topics: ["grants", "startup-ideas"],
    ecosystemSlugs: ["solana"],
    createdAt: "2026-06-01T11:00:00Z",
  },
  {
    platform: "x",
    postUrl: "https://x.com/Defi_Warhol/status/2061445922354237544",
    topics: ["startup-ideas"],
    createdAt: "2026-06-01T10:00:00Z",
  },
  {
    platform: "reddit",
    postUrl:
      "https://www.reddit.com/r/web3/comments/1rsntb7/got_50k_players_in_our_first_week_with_zero/",
    topics: ["startup-ideas"],
    createdAt: "2026-05-31T10:00:00Z",
  },
  {
    platform: "reddit",
    postUrl:
      "https://www.reddit.com/r/SideProject/comments/1poutx7/why_block_ai_bots_when_you_can_invoice_them_ive/",
    topics: ["startup-ideas", "apis"],
    createdAt: "2026-05-29T14:00:00Z",
  },
  {
    platform: "reddit",
    postUrl:
      "https://www.reddit.com/r/SideProject/comments/1nfzowi/stop_building_useless_sht/",
    topics: ["startup-ideas"],
    createdAt: "2025-09-20T12:00:00Z",
  },
  {
    platform: "reddit",
    postUrl:
      "https://www.reddit.com/r/SideProject/comments/1o8fgk6/made_a_tool_that_connects_ai_to_live_stock_and/",
    topics: ["startup-ideas", "apis"],
    createdAt: "2025-10-15T11:00:00Z",
  },
  {
    platform: "reddit",
    postUrl:
      "https://www.reddit.com/r/SideProject/comments/1hy2w8q/i_built_onlysales_earn_commissions_selling_saas/",
    topics: ["startup-ideas"],
    createdAt: "2025-02-01T09:00:00Z",
  },
  {
    platform: "reddit",
    postUrl:
      "https://www.reddit.com/r/web3/comments/1l4xose/a_few_web3_ideas_for_startup_or_business_to_start/",
    topics: ["startup-ideas"],
    createdAt: "2024-06-15T08:00:00Z",
  },
  {
    platform: "x",
    postUrl: "https://x.com/ChromiumDev/status/2060063551876645050",
    topics: ["apis", "infrastructure"],
    createdAt: "2026-05-28T18:00:00Z",
  },
  {
    platform: "x",
    postUrl: "https://x.com/kseniam0s/status/2060055886047982050",
    topics: ["grants", "startup-ideas"],
    createdAt: "2026-05-28T16:00:00Z",
  },
  {
    platform: "x",
    postUrl: "https://x.com/PranavGorathe/status/2059937836435218734",
    topics: ["grants", "startup-ideas"],
    createdAt: "2026-05-28T14:00:00Z",
  },
  {
    platform: "x",
    postUrl: "https://x.com/twistartups/status/2059764366988472493",
    topics: ["startup-ideas"],
    createdAt: "2026-05-27T22:30:00Z",
  },
  {
    platform: "x",
    postUrl: "https://x.com/twistartups/status/2059764369269919993",
    topics: ["grants", "startup-ideas"],
    createdAt: "2026-05-27T22:31:00Z",
    xHideConversation: true,
  },
  {
    platform: "x",
    postUrl: "https://x.com/0xPicasso/status/1932111961929760787",
    topics: ["grants", "startup-ideas"],
    ecosystemSlugs: ["hyperliquid"],
    createdAt: "2025-06-09T12:00:00Z",
  },
];

export const topicsByUrl = Object.fromEntries(
  intelPostsCatalog.map((entry) => [entry.postUrl, entry.topics]),
) as Record<string, IntelPostCatalogEntry["topics"]>;
