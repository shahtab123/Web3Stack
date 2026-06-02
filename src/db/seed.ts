import { config } from "dotenv";
import { createDb } from "./index";
import {
  apiCategories,
  apis,
  categories,
  ecosystems,
  grants,
  ideaApis,
  ideaEcosystems,
  ideas,
  intelPosts,
  recipeApis,
  recipes,
  relatedIdeas,
} from "./schema";
import {
  seedApis,
  seedCategories,
  seedEcosystems,
  seedGrants,
  seedIdeas,
  seedIntelPosts,
  seedRecipes,
} from "./seed-data";

config({ path: ".env.local" });
config({ path: ".env" });

async function seed() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("DATABASE_URL is not set. Copy .env.example to .env.local");
    process.exit(1);
  }

  const db = createDb(connectionString);

  console.log("Clearing existing data...");

  await db.delete(relatedIdeas);
  await db.delete(ideaApis);
  await db.delete(ideaEcosystems);
  await db.delete(ideas);
  await db.delete(intelPosts);
  await db.delete(recipeApis);
  await db.delete(recipes);
  await db.delete(apiCategories);
  await db.delete(grants);
  await db.delete(apis);
  await db.delete(categories);
  await db.delete(ecosystems);

  console.log("Seeding ecosystems...");
  const insertedEcosystems = await db
    .insert(ecosystems)
    .values(seedEcosystems)
    .returning({ id: ecosystems.id, slug: ecosystems.slug });

  const ecosystemIdBySlug = Object.fromEntries(
    insertedEcosystems.map((row) => [row.slug, row.id]),
  );

  console.log("Seeding categories...");
  const insertedCategories = await db
    .insert(categories)
    .values(seedCategories)
    .returning({ id: categories.id, slug: categories.slug });

  const categoryIdBySlug = Object.fromEntries(
    insertedCategories.map((row) => [row.slug, row.id]),
  );

  console.log("Seeding APIs...");
  const insertedApis = await db
    .insert(apis)
    .values(
      seedApis.map((api) => ({
        slug: api.slug,
        name: api.name,
        description: api.description,
        purpose: api.purpose,
        website: api.website,
        openSource: api.openSource,
        freeTier: api.freeTier,
        ecosystemId: ecosystemIdBySlug[api.ecosystemSlug] ?? null,
      })),
    )
    .returning({ id: apis.id, slug: apis.slug });

  const apiIdBySlug = Object.fromEntries(
    insertedApis.map((row) => [row.slug, row.id]),
  );

  console.log("Seeding API categories...");
  const apiCategoryRows = seedApis.flatMap((api) =>
    api.categorySlugs
      .map((slug) => {
        const apiId = apiIdBySlug[api.slug];
        const categoryId = categoryIdBySlug[slug];
        if (!apiId || !categoryId) return null;
        return { apiId, categoryId };
      })
      .filter(Boolean),
  ) as { apiId: number; categoryId: number }[];

  if (apiCategoryRows.length > 0) {
    await db.insert(apiCategories).values(apiCategoryRows);
  }

  console.log("Seeding recipes...");
  const insertedRecipes = await db
    .insert(recipes)
    .values(
      seedRecipes.map((recipe) => ({
        slug: recipe.slug,
        title: recipe.title,
        description: recipe.description,
        difficulty: recipe.difficulty,
        estimatedTime: recipe.estimatedTime,
      })),
    )
    .returning({ id: recipes.id, slug: recipes.slug });

  const recipeIdBySlug = Object.fromEntries(
    insertedRecipes.map((row) => [row.slug, row.id]),
  );

  console.log("Seeding recipe APIs...");
  const recipeApiRows = seedRecipes.flatMap((recipe) =>
    recipe.apiSlugs
      .map((slug) => {
        const recipeId = recipeIdBySlug[recipe.slug];
        const apiId = apiIdBySlug[slug];
        if (!recipeId || !apiId) return null;
        return { recipeId, apiId };
      })
      .filter(Boolean),
  ) as { recipeId: number; apiId: number }[];

  if (recipeApiRows.length > 0) {
    await db.insert(recipeApis).values(recipeApiRows);
  }

  console.log("Seeding grants...");
  await db.insert(grants).values(
    seedGrants.map((grant) => ({
      slug: grant.slug,
      title: grant.title,
      description: grant.description,
      link: grant.link,
      ecosystemId: grant.ecosystemSlug
        ? (ecosystemIdBySlug[grant.ecosystemSlug] ?? null)
        : null,
    })),
  );

  console.log("Seeding intel posts...");
  const insertedIntelPosts = await db
    .insert(intelPosts)
    .values(seedIntelPosts)
    .returning({ id: intelPosts.id });

  console.log("Seeding ideas...");
  const insertedIdeas = await db
    .insert(ideas)
    .values(
      seedIdeas.map((idea) => ({
        slug: idea.slug,
        title: idea.title,
        description: idea.description,
        overview: idea.overview,
        difficulty: idea.difficulty,
        estimatedBuildTime: idea.estimatedTime,
        category: idea.category,
      })),
    )
    .returning({ id: ideas.id, slug: ideas.slug });

  const ideaIdBySlug = Object.fromEntries(
    insertedIdeas.map((row) => [row.slug, row.id]),
  );

  console.log("Seeding idea APIs...");
  const ideaApiRows = seedIdeas.flatMap((idea) =>
    idea.apiSlugs
      .map((slug) => {
        const ideaId = ideaIdBySlug[idea.slug];
        const apiId = apiIdBySlug[slug];
        if (!ideaId || !apiId) return null;
        return { ideaId, apiId };
      })
      .filter(Boolean),
  ) as { ideaId: number; apiId: number }[];

  if (ideaApiRows.length > 0) {
    await db.insert(ideaApis).values(ideaApiRows);
  }

  console.log("Seeding idea ecosystems...");
  const ideaEcosystemRows = seedIdeas.flatMap((idea) =>
    idea.ecosystemSlugs
      .map((slug) => {
        const ideaId = ideaIdBySlug[idea.slug];
        const ecosystemId = ecosystemIdBySlug[slug];
        if (!ideaId || !ecosystemId) return null;
        return { ideaId, ecosystemId };
      })
      .filter(Boolean),
  ) as { ideaId: number; ecosystemId: number }[];

  if (ideaEcosystemRows.length > 0) {
    await db.insert(ideaEcosystems).values(ideaEcosystemRows);
  }

  console.log("Seeding related ideas...");
  const relatedIdeaRows = seedIdeas.flatMap((idea) =>
    idea.relatedIdeaSlugs
      .map((slug) => {
        const ideaId = ideaIdBySlug[idea.slug];
        const relatedIdeaId = ideaIdBySlug[slug];
        if (!ideaId || !relatedIdeaId || ideaId === relatedIdeaId) return null;
        return { ideaId, relatedIdeaId };
      })
      .filter(Boolean),
  ) as { ideaId: number; relatedIdeaId: number }[];

  if (relatedIdeaRows.length > 0) {
    await db.insert(relatedIdeas).values(relatedIdeaRows);
  }

  console.log("Seed complete.");
  console.log(`  Ecosystems: ${insertedEcosystems.length}`);
  console.log(`  Categories: ${insertedCategories.length}`);
  console.log(`  APIs: ${insertedApis.length}`);
  console.log(`  Recipes: ${insertedRecipes.length}`);
  console.log(`  Grants: ${seedGrants.length}`);
  console.log(`  Intel posts: ${insertedIntelPosts.length}`);
  console.log(`  Ideas: ${insertedIdeas.length}`);

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
