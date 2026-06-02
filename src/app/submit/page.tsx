import type { Metadata } from "next";
import { SubmitPageContent } from "@/components/submit/submit-page-content";

export const metadata: Metadata = {
  title: "Submit a Resource",
  description:
    "Help improve Web3Stack by contributing APIs, recipes, ecosystems, grants, builder intel and other free or open source resources.",
};

export default function SubmitPage() {
  return <SubmitPageContent />;
}
