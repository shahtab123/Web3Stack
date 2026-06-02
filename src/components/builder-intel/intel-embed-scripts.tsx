"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: { widgets?: { load: (element?: HTMLElement) => void } };
  }
}

export function IntelEmbedScripts() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.twttr?.widgets?.load();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Script
      src="https://platform.x.com/widgets.js"
      strategy="lazyOnload"
      onLoad={() => window.twttr?.widgets?.load()}
    />
  );
}
