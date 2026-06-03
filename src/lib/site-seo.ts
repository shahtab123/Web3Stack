import type { Metadata } from "next";

export const SITE = {
  name: "Web3Scout",
  tagline: "APIs, recipes, grants & ecosystems for Web3 builders",
  description:
    "Curated directory of free and open Web3 APIs, developer tools, recipes, grants, hackathons, startup ideas, and ecosystem resources — all in one place.",
  keywords: [
    "Web3",
    "crypto APIs",
    "blockchain developer tools",
    "DeFi",
    "Solana",
    "Ethereum",
    "grants",
    "hackathons",
    "open source",
    "developer recipes",
    "startup ideas",
  ],
  githubUrl: "https://github.com/shahtab123/Web3Stack",
  twitterHandle: "@Web3Scout",
} as const;

export const OG_IMAGE = {
  path: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Web3Scout — Web3 APIs, recipes, grants & ecosystems",
} as const;

export const TWITTER_IMAGE = {
  path: "/twitter-card.png",
  width: 1200,
  height: 675,
  alt: OG_IMAGE.alt,
} as const;

const DEFAULT_SITE_URL = "http://localhost:3000";

/** Canonical site origin (no trailing slash). Set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return DEFAULT_SITE_URL;
}

export function absoluteUrl(path = ""): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function fullTitle(title?: string): string {
  if (!title || title === SITE.name) return SITE.name;
  return `${title} · ${SITE.name}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path only, e.g. `/apis` or `/apis/alchemy` */
  path?: string;
  /** Use twitter-card.png instead of default OG crop */
  socialImage?: "og" | "twitter";
  noIndex?: boolean;
};

function socialImages(kind: "og" | "twitter" = "og") {
  const image = kind === "twitter" ? TWITTER_IMAGE : OG_IMAGE;
  return [
    {
      url: image.path,
      width: image.width,
      height: image.height,
      alt: image.alt,
    },
  ];
}

/** Per-route metadata for listing and marketing pages. */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const path = input.path ?? "/";
  const canonical = absoluteUrl(path);
  const title = fullTitle(input.title);
  const imageKind = input.socialImage ?? "og";

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    keywords: [...SITE.keywords],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE.name,
      title,
      description: input.description,
      images: socialImages(imageKind),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [TWITTER_IMAGE.path],
      creator: SITE.twitterHandle,
      site: SITE.twitterHandle,
    },
    ...(input.noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

/** Detail pages (API, recipe, grant, etc.). */
export function buildDetailMetadata(input: PageMetadataInput): Metadata {
  return buildPageMetadata(input);
}

/** Root layout defaults merged with page-level metadata. */
export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: SITE.name,
      template: `%s · ${SITE.name}`,
    },
    description: SITE.description,
    keywords: [...SITE.keywords],
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.githubUrl }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "technology",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: absoluteUrl("/"),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl("/"),
      siteName: SITE.name,
      title: SITE.name,
      description: SITE.description,
      images: socialImages("og"),
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.name,
      description: SITE.description,
      images: [TWITTER_IMAGE.path],
      creator: SITE.twitterHandle,
      site: SITE.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // Favicon + Apple touch: src/app/icon.tsx and src/app/apple-icon.tsx (same W3S mark)
  };
}

export function websiteJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: SITE.name,
        url,
        description: SITE.description,
        sameAs: [SITE.githubUrl],
      },
    ],
  };
}
