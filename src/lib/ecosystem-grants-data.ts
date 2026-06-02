import { grantsDirectory } from "./grants-directory-data";

export type EcosystemGrantEntry = {
  slug: string;
  title: string;
  org: string;
  description: string;
  ecosystemSlugs: string[];
  href: string;
};

export const ecosystemGrantsCatalog: EcosystemGrantEntry[] = grantsDirectory.map(
  (grant) => ({
    slug: grant.slug,
    title: grant.name,
    org: grant.org,
    description: grant.description,
    ecosystemSlugs: grant.ecosystemSlugs,
    href: `/grants/${grant.slug}`,
  }),
);
