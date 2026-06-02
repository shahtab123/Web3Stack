"use client";

import Image from "next/image";
import { useState } from "react";
import { getBrandInitials, getBrandLogoUrl } from "@/lib/brand-logos";
import { cn } from "@/lib/utils";

type ProjectLogoProps = {
  slug: string;
  name: string;
  websiteUrl?: string | null;
  size?: number;
  className?: string;
};

export function ProjectLogo({
  slug,
  name,
  websiteUrl,
  size = 40,
  className,
}: ProjectLogoProps) {
  const [failed, setFailed] = useState(false);
  const logoUrl = getBrandLogoUrl(slug, websiteUrl);

  if (!logoUrl || failed) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-surface font-medium text-foreground",
          className,
        )}
        style={{ width: size, height: size, fontSize: Math.max(10, size * 0.28) }}
        aria-hidden
      >
        {getBrandInitials(name)}
      </span>
    );
  }

  return (
    <Image
      src={logoUrl}
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0 rounded-lg", className)}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
