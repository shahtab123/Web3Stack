import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { EcosystemGrid } from "@/components/ecosystems/ecosystem-grid";
import { getBrowseEcosystemsWithCounts } from "@/lib/browse-ecosystems";

export const metadata: Metadata = {
  title: "Ecosystems",
  description:
    "Explore blockchain ecosystems, their developer tools, APIs, grants and opportunities.",
};

export default async function EcosystemsPage() {
  const ecosystems = await getBrowseEcosystemsWithCounts();

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-10">
      <PageHeader
        title="Ecosystems"
        subtitle="Explore blockchain ecosystems, their developer tools, APIs, grants and opportunities."
        stats={[{ label: "Ecosystems", value: ecosystems.length }]}
      />

      <EcosystemGrid ecosystems={ecosystems} />
    </div>
  );
}
