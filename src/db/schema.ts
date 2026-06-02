import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const ecosystems = pgTable(
  "ecosystems",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
  },
  (table) => [index("ecosystems_slug_idx").on(table.slug)],
);

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
  },
  (table) => [index("categories_slug_idx").on(table.slug)],
);

export const apis = pgTable(
  "apis",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    purpose: text("purpose").notNull(),
    website: text("website").notNull(),
    openSource: boolean("open_source").notNull().default(false),
    freeTier: boolean("free_tier").notNull().default(false),
    ecosystemId: integer("ecosystem_id").references(() => ecosystems.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("apis_slug_idx").on(table.slug),
    index("apis_ecosystem_id_idx").on(table.ecosystemId),
  ],
);

export const apiCategories = pgTable(
  "api_categories",
  {
    apiId: integer("api_id")
      .notNull()
      .references(() => apis.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.apiId, table.categoryId] }),
    index("api_categories_category_id_idx").on(table.categoryId),
  ],
);

export const recipes = pgTable(
  "recipes",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    difficulty: text("difficulty").notNull(),
    estimatedTime: text("estimated_time").notNull(),
  },
  (table) => [index("recipes_slug_idx").on(table.slug)],
);

export const recipeApis = pgTable(
  "recipe_apis",
  {
    recipeId: integer("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    apiId: integer("api_id")
      .notNull()
      .references(() => apis.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.recipeId, table.apiId] }),
    index("recipe_apis_api_id_idx").on(table.apiId),
  ],
);

export const grants = pgTable(
  "grants",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    ecosystemId: integer("ecosystem_id").references(() => ecosystems.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    link: text("link").notNull(),
  },
  (table) => [
    index("grants_slug_idx").on(table.slug),
    index("grants_ecosystem_id_idx").on(table.ecosystemId),
  ],
);

export const intelPosts = pgTable(
  "intel_posts",
  {
    id: serial("id").primaryKey(),
    platform: text("platform").notNull(),
    postUrl: text("post_url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("intel_posts_platform_idx").on(table.platform),
    index("intel_posts_created_at_idx").on(table.createdAt),
  ],
);

export const ecosystemsRelations = relations(ecosystems, ({ many }) => ({
  apis: many(apis),
  grants: many(grants),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  apiCategories: many(apiCategories),
}));

export const apisRelations = relations(apis, ({ one, many }) => ({
  ecosystem: one(ecosystems, {
    fields: [apis.ecosystemId],
    references: [ecosystems.id],
  }),
  apiCategories: many(apiCategories),
  recipeApis: many(recipeApis),
}));

export const apiCategoriesRelations = relations(apiCategories, ({ one }) => ({
  api: one(apis, {
    fields: [apiCategories.apiId],
    references: [apis.id],
  }),
  category: one(categories, {
    fields: [apiCategories.categoryId],
    references: [categories.id],
  }),
}));

export const recipesRelations = relations(recipes, ({ many }) => ({
  recipeApis: many(recipeApis),
}));

export const recipeApisRelations = relations(recipeApis, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeApis.recipeId],
    references: [recipes.id],
  }),
  api: one(apis, {
    fields: [recipeApis.apiId],
    references: [apis.id],
  }),
}));

export const grantsRelations = relations(grants, ({ one }) => ({
  ecosystem: one(ecosystems, {
    fields: [grants.ecosystemId],
    references: [ecosystems.id],
  }),
}));

export const intelPostsRelations = relations(intelPosts, () => ({}));

export const ideas = pgTable(
  "ideas",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    overview: text("overview").notNull(),
    difficulty: text("difficulty").notNull(),
    estimatedBuildTime: text("estimated_build_time").notNull(),
    category: text("category").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("ideas_slug_idx").on(table.slug),
    index("ideas_category_idx").on(table.category),
    index("ideas_difficulty_idx").on(table.difficulty),
  ],
);

export const ideaApis = pgTable(
  "idea_apis",
  {
    ideaId: integer("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    apiId: integer("api_id")
      .notNull()
      .references(() => apis.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.ideaId, table.apiId] }),
    index("idea_apis_api_id_idx").on(table.apiId),
  ],
);

export const ideaEcosystems = pgTable(
  "idea_ecosystems",
  {
    ideaId: integer("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    ecosystemId: integer("ecosystem_id")
      .notNull()
      .references(() => ecosystems.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.ideaId, table.ecosystemId] }),
    index("idea_ecosystems_ecosystem_id_idx").on(table.ecosystemId),
  ],
);

export const relatedIdeas = pgTable(
  "related_ideas",
  {
    ideaId: integer("idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
    relatedIdeaId: integer("related_idea_id")
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.ideaId, table.relatedIdeaId] }),
    index("related_ideas_related_idea_id_idx").on(table.relatedIdeaId),
  ],
);

export const ideasRelations = relations(ideas, ({ many }) => ({
  ideaApis: many(ideaApis),
  ideaEcosystems: many(ideaEcosystems),
  relatedFrom: many(relatedIdeas, { relationName: "ideaRelations" }),
  relatedTo: many(relatedIdeas, { relationName: "relatedIdeaRelations" }),
}));

export const ideaApisRelations = relations(ideaApis, ({ one }) => ({
  idea: one(ideas, {
    fields: [ideaApis.ideaId],
    references: [ideas.id],
  }),
  api: one(apis, {
    fields: [ideaApis.apiId],
    references: [apis.id],
  }),
}));

export const ideaEcosystemsRelations = relations(ideaEcosystems, ({ one }) => ({
  idea: one(ideas, {
    fields: [ideaEcosystems.ideaId],
    references: [ideas.id],
  }),
  ecosystem: one(ecosystems, {
    fields: [ideaEcosystems.ecosystemId],
    references: [ecosystems.id],
  }),
}));

export const relatedIdeasRelations = relations(relatedIdeas, ({ one }) => ({
  idea: one(ideas, {
    fields: [relatedIdeas.ideaId],
    references: [ideas.id],
    relationName: "ideaRelations",
  }),
  relatedIdea: one(ideas, {
    fields: [relatedIdeas.relatedIdeaId],
    references: [ideas.id],
    relationName: "relatedIdeaRelations",
  }),
}));

export type Ecosystem = typeof ecosystems.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Api = typeof apis.$inferSelect;
export type Recipe = typeof recipes.$inferSelect;
export type Grant = typeof grants.$inferSelect;
export type IntelPost = typeof intelPosts.$inferSelect;
export type Idea = typeof ideas.$inferSelect;

export type NewEcosystem = typeof ecosystems.$inferInsert;
export type NewCategory = typeof categories.$inferInsert;
export type NewApi = typeof apis.$inferInsert;
export type NewRecipe = typeof recipes.$inferInsert;
export type NewGrant = typeof grants.$inferInsert;
export type NewIntelPost = typeof intelPosts.$inferInsert;
export type NewIdea = typeof ideas.$inferInsert;

/** @deprecated Use Api from the apis table. Kept for legacy UI components. */
export type Tool = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  githubUrl: string | null;
  category: "web3" | "fintech" | "ai" | "developer";
  pricing: "free" | "freemium" | "open-source";
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};
