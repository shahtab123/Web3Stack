import type { Metadata } from "next";
import { SubmitPageContent } from "@/components/submit/submit-page-content";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Submit a Resource",
  description:
    "Help improve Web3Scout by contributing APIs, recipes, ecosystems, grants, builder intel and other free or open source resources.",
  path: "/submit",
});

export default function SubmitPage() {
  return <SubmitPageContent />;
}
