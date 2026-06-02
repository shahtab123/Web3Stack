import { and, asc, desc, eq, ilike, or } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { apis, type Api, type Tool } from "@/db/schema";
import { seedApis } from "@/db/seed-data";
import type { Category, Pricing } from "@/lib/constants";

export type ToolFilters = {
  q?: string;
  category?: Category;
  pricing?: Pricing;
  featured?: boolean;
  sort?: "name" | "newest" | "featured";
};

function inferLegacyCategory(api: {
  slug: string;
  categorySlugs?: string[];
}): Category {
  const slugs = api.categorySlugs ?? [];
  if (slugs.some((s) => ["trading", "wallets", "authentication"].includes(s)))
    return "web3";
  if (slugs.some((s) => ["payments", "banking", "cards", "compliance"].includes(s)))
    return "fintech";
  if (slugs.includes("ai")) return "ai";
  return "developer";
}

function inferPricing(api: {
  openSource: boolean;
  freeTier: boolean;
}): Pricing {
  if (api.openSource) return "open-source";
  if (api.freeTier) return "freemium";
  return "free";
}

function mapSeedApiToTool(api: (typeof seedApis)[number], index: number): Tool {
  return {
    id: index + 1,
    slug: api.slug,
    name: api.name,
    tagline: api.description,
    description: api.purpose,
    url: api.website,
    githubUrl: null,
    category: inferLegacyCategory(api),
    pricing: inferPricing(api),
    tags: api.categorySlugs,
    featured: ["privy", "hyperliquid", "alchemy", "stripe"].includes(api.slug),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  };
}

function mapDbApiToTool(api: Api): Tool {
  return {
    id: api.id,
    slug: api.slug,
    name: api.name,
    tagline: api.description,
    description: api.purpose,
    url: api.website,
    githubUrl: null,
    category: "developer",
    pricing: inferPricing(api),
    tags: [],
    featured: false,
    createdAt: api.createdAt,
    updatedAt: api.createdAt,
  };
}

function filterTools(items: Tool[], filters: ToolFilters): Tool[] {
  let results = [...items];

  if (filters.q) {
    const query = filters.q.toLowerCase();
    results = results.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.tagline.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  if (filters.category) {
    results = results.filter((tool) => tool.category === filters.category);
  }

  if (filters.pricing) {
    results = results.filter((tool) => tool.pricing === filters.pricing);
  }

  if (filters.featured) {
    results = results.filter((tool) => tool.featured);
  }

  return sortTools(results, filters.sort);
}

function sortTools(items: Tool[], sort: ToolFilters["sort"] = "featured") {
  const sorted = [...items];

  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }
}

export async function getTools(filters: ToolFilters = {}): Promise<Tool[]> {
  if (!isDatabaseConfigured()) {
    return filterTools(
      seedApis.map((api, index) => mapSeedApiToTool(api, index)),
      filters,
    );
  }

  const db = getDb();
  const conditions = [];

  if (filters.q) {
    const pattern = `%${filters.q}%`;
    conditions.push(
      or(
        ilike(apis.name, pattern),
        ilike(apis.description, pattern),
        ilike(apis.purpose, pattern),
      ),
    );
  }

  if (filters.pricing === "open-source") {
    conditions.push(eq(apis.openSource, true));
  } else if (filters.pricing === "freemium" || filters.pricing === "free") {
    conditions.push(eq(apis.freeTier, true));
  }

  const orderBy =
    filters.sort === "name"
      ? asc(apis.name)
      : filters.sort === "newest"
        ? desc(apis.createdAt)
        : asc(apis.name);

  try {
    const rows = await db
      .select()
      .from(apis)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(...(Array.isArray(orderBy) ? orderBy : [orderBy]));

    if (rows.length === 0) {
      return filterTools(
        seedApis.map((api, index) => mapSeedApiToTool(api, index)),
        filters,
      );
    }

    return filterTools(rows.map(mapDbApiToTool), filters);
  } catch {
    return filterTools(
      seedApis.map((api, index) => mapSeedApiToTool(api, index)),
      filters,
    );
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  if (!isDatabaseConfigured()) {
    const index = seedApis.findIndex((api) => api.slug === slug);
    if (index === -1) return null;
    return mapSeedApiToTool(seedApis[index], index);
  }

  try {
    const db = getDb();
    const [row] = await db.select().from(apis).where(eq(apis.slug, slug)).limit(1);
    return row ? mapDbApiToTool(row) : null;
  } catch {
    const index = seedApis.findIndex((api) => api.slug === slug);
    if (index === -1) return null;
    return mapSeedApiToTool(seedApis[index], index);
  }
}

export async function getToolStats() {
  const allTools = await getTools();

  const byCategory = allTools.reduce(
    (acc, tool) => {
      acc[tool.category] = (acc[tool.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<Category, number>,
  );

  const byPricing = allTools.reduce(
    (acc, tool) => {
      acc[tool.pricing] = (acc[tool.pricing] ?? 0) + 1;
      return acc;
    },
    {} as Record<Pricing, number>,
  );

  return {
    total: allTools.length,
    featured: allTools.filter((t) => t.featured).length,
    byCategory,
    byPricing,
  };
}

export async function getRelatedTools(tool: Tool, limit = 4): Promise<Tool[]> {
  const allTools = await getTools({ category: tool.category });
  return allTools.filter((t) => t.id !== tool.id).slice(0, limit);
}
