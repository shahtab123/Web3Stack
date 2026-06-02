export type ContributorSocialLink = {
  label: string;
  url: string;
};

export type ContributorContribution = {
  id: string;
  title: string;
  page: string;
};

export type ContributorEntry = {
  id: string;
  name: string;
  socialLinks: ContributorSocialLink[];
  items: ContributorContribution[];
};

export const CONTRIBUTOR_PERKS = [
  {
    title: "Merged GitHub PR",
    description:
      "Accepted GitHub submissions become public pull requests on your profile.",
  },
  {
    title: "Name credit",
    description:
      "Your name appears beside resources you add, with a link to your social profile.",
  },
  {
    title: "Contributors page",
    description:
      "Get listed publicly with your name, profile links, and contribution count.",
  },
  {
    title: "Builder reputation",
    description:
      "Show up as someone who curates and improves tools for the Web3 ecosystem.",
  },
  {
    title: "Shape the directory",
    description:
      "Help decide what APIs, recipes, grants, and intel belong in the stack builders use daily.",
  },
  {
    title: "Open source footprint",
    description:
      "Build a visible record of helping the community discover free and open tools.",
  },
] as const;

/** Manually maintained — add names, social links, and accepted contributions here. */
export const contributors: ContributorEntry[] = [
  {
    id: "shahtab-mohtasin",
    name: "Shahtab Mohtasin",
    socialLinks: [
      { label: "X", url: "https://x.com/SMohtasin" },
    ],
    items: [
      { id: "web3stack", title: "Web3Stack directory launch", page: "Site" },
      { id: "apis", title: "APIs directory", page: "APIs" },
      { id: "recipes", title: "Recipes directory", page: "Recipes" },
      { id: "ideas", title: "Ideas directory", page: "Ideas" },
      { id: "ecosystems", title: "Ecosystems directory", page: "Ecosystems" },
      { id: "grants", title: "Grants directory", page: "Grants" },
      { id: "builder-intel", title: "Builder Intel feed", page: "Builder Intel" },
      { id: "crypto-stocks", title: "Crypto Stocks tracker", page: "Crypto Stocks" },
      { id: "submit-page", title: "Submit a Resource flow", page: "Site" },
      { id: "contributors-page", title: "Contributors page", page: "Site" },
      { id: "intel-reddit-1", title: "Reddit intel — 50k players web3 gaming", page: "Builder Intel" },
      { id: "intel-reddit-2", title: "Reddit intel — Invoice AI bots", page: "Builder Intel" },
      { id: "intel-reddit-3", title: "Reddit intel — Stop building useless sh*t", page: "Builder Intel" },
      { id: "intel-reddit-4", title: "Reddit intel — AI + live stock/crypto data", page: "Builder Intel" },
      { id: "intel-reddit-5", title: "Reddit intel — OnlySales SaaS affiliate", page: "Builder Intel" },
      { id: "intel-reddit-6", title: "Reddit intel — Web3 startup ideas thread", page: "Builder Intel" },
      { id: "neon-db", title: "Neon database integration for directories", page: "Site" },
      { id: "global-search", title: "Global search across directories", page: "Search" },
    ],
  },
];

export function getContributorContributionCount(contributor: ContributorEntry) {
  return contributor.items.length;
}

export function getContributorStats() {
  const totalContributors = contributors.length;
  const totalContributions = contributors.reduce(
    (sum, contributor) => sum + getContributorContributionCount(contributor),
    0,
  );

  return { totalContributors, totalContributions };
}

export function getSocialLinkLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");

    if (host === "github.com") return "GitHub";
    if (host === "x.com" || host === "twitter.com") return "X";
    if (host === "warpcast.com") return "Farcaster";
    if (host === "linkedin.com") return "LinkedIn";

    return host;
  } catch {
    return "Profile";
  }
}
