export const SITE = {
  name: "Web3Stack",
  githubUrl: "https://github.com/shahtab123/Web3Stack",
  submitUrl: "/submit",
  contributorsUrl: "/contributors",
} as const;

export const primaryNav = [
  { href: "/", label: "Discover", shortLabel: "Discover" },
  { href: "/apis", label: "APIs", shortLabel: "APIs" },
  { href: "/recipes", label: "Recipes", shortLabel: "Recipes" },
  { href: "/ideas", label: "Ideas", shortLabel: "Ideas" },
  { href: "/ecosystems", label: "Ecosystems", shortLabel: "Eco" },
  { href: "/grants", label: "Grants", shortLabel: "Grants" },
  { href: "/builder-intel", label: "Builder Intel", shortLabel: "Intel" },
  { href: "/crypto-stocks", label: "Crypto Stocks", shortLabel: "Stocks" },
  { href: "/search", label: "Search", shortLabel: "Search" },
] as const;

export type NavItem = (typeof primaryNav)[number];

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
