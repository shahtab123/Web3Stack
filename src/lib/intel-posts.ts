import { desc } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { intelPosts } from "@/db/schema";
import {
  intelPostsCatalog,
  topicsByUrl,
} from "./intel-posts-data";
import type {
  IntelFilter,
  IntelPlatform,
  IntelPostItem,
  IntelTopic,
} from "./intel-posts-types";
import {
  detectPlatformFromUrl,
  INTEL_PLATFORMS,
  INTEL_TOPICS,
} from "./intel-posts-types";

export type IntelPostFilters = {
  q?: string;
  filter?: IntelFilter;
};

const platformSlugs = new Set(INTEL_PLATFORMS.map((p) => p.slug));
const topicSlugs = new Set(INTEL_TOPICS.map((t) => t.slug));

function isPlatformFilter(filter: IntelFilter): filter is IntelPlatform {
  return filter !== "all" && platformSlugs.has(filter as IntelPlatform);
}

function isTopicFilter(filter: IntelFilter): filter is IntelTopic {
  return filter !== "all" && topicSlugs.has(filter as IntelTopic);
}

function catalogToItems(): IntelPostItem[] {
  return intelPostsCatalog.map((entry, index) => ({
    id: index + 1,
    platform: entry.platform,
    postUrl: entry.postUrl,
    topics: entry.topics,
    createdAt: new Date(entry.createdAt),
    xHideConversation: entry.xHideConversation,
  }));
}

function applyFilters(
  items: IntelPostItem[],
  filters: IntelPostFilters,
): IntelPostItem[] {
  let results = [...items];

  if (filters.q) {
    const query = filters.q.toLowerCase();
    results = results.filter(
      (item) =>
        item.postUrl.toLowerCase().includes(query) ||
        item.platform.includes(query) ||
        item.topics.some((topic) => topic.includes(query)),
    );
  }

  if (filters.filter && filters.filter !== "all") {
    if (isPlatformFilter(filters.filter)) {
      results = results.filter((item) => item.platform === filters.filter);
    } else if (isTopicFilter(filters.filter)) {
      results = results.filter((item) =>
        item.topics.includes(filters.filter as IntelTopic),
      );
    }
  }

  return results.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

function catalogEntryByUrl(url: string) {
  return intelPostsCatalog.find((entry) => entry.postUrl === url);
}

export async function getIntelPosts(
  filters: IntelPostFilters = {},
): Promise<IntelPostItem[]> {
  if (!isDatabaseConfigured()) {
    return applyFilters(catalogToItems(), filters);
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(intelPosts)
      .orderBy(desc(intelPosts.createdAt));

    if (rows.length === 0) {
      return applyFilters(catalogToItems(), filters);
    }

    const items: IntelPostItem[] = rows.map((row) => {
      const catalogEntry = catalogEntryByUrl(row.postUrl);

      return {
        id: row.id,
        platform:
          (row.platform as IntelPlatform) ||
          catalogEntry?.platform ||
          detectPlatformFromUrl(row.postUrl),
        postUrl: row.postUrl,
        topics: catalogEntry?.topics ?? topicsByUrl[row.postUrl] ?? [],
        createdAt: row.createdAt,
        xHideConversation: catalogEntry?.xHideConversation,
      };
    });

    return applyFilters(items, filters);
  } catch {
    return applyFilters(catalogToItems(), filters);
  }
}

/** Homepage preview — X and other embeds only; Reddit stays on /builder-intel. */
export async function getHomepageIntelPreview(limit = 4) {
  const posts = await getIntelPosts();
  return posts.filter((post) => post.platform !== "reddit").slice(0, limit);
}

export type { IntelPostItem, IntelFilter, IntelPlatform, IntelTopic };
export {
  INTEL_PLATFORMS,
  INTEL_TOPICS,
  getPlatformLabel,
} from "./intel-posts-types";
