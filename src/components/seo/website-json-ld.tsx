import { websiteJsonLd } from "@/lib/site-seo";

export function WebsiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
    />
  );
}
