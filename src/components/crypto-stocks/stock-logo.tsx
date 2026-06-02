"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { logoFromWebsite } from "@/lib/stock-market/format";

type StockLogoProps = {
  name: string;
  website: string;
  logoUrl?: string | null;
  className?: string;
};

export function StockLogo({
  name,
  website,
  logoUrl,
  className,
}: StockLogoProps) {
  const favicon = logoFromWebsite(website);
  const [src, setSrc] = useState(logoUrl || favicon);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-md bg-neutral-100 text-[10px] font-semibold uppercase text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400",
          className,
        )}
        aria-hidden
      >
        {name.slice(0, 2)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={32}
      height={32}
      className={cn(
        "size-8 shrink-0 rounded-md bg-white object-contain p-0.5 dark:bg-neutral-900",
        className,
      )}
      onError={() => {
        if (src !== favicon && favicon) {
          setSrc(favicon);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
