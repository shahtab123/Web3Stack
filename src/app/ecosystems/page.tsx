import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { EcosystemGrid } from "@/components/ecosystems/ecosystem-grid";
import { getBrowseEcosystemsWithCounts } from "@/lib/browse-ecosystems";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Ecosystems",
  description:
    "Explore blockchain ecosystems, their developer tools, APIs, grants and opportunities.",
  path: "/ecosystems",
});

export default async function EcosystemsPage() {
  const ecosystems = await getBrowseEcosystemsWithCounts();

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-10">
      <PageHeader
        title={`Ecosystems (${ecosystems.length})`}
        subtitle="Explore blockchain ecosystems, their developer tools, APIs, grants and opportunities."
      />

      <EcosystemGrid ecosystems={ecosystems} />
    </div>
  );
}
