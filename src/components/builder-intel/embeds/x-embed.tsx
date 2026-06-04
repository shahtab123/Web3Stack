"use client";

import { useEffect, useRef } from "react";

type XEmbedProps = {
  url: string;
  hideConversation?: boolean;
  compact?: boolean;
  eager?: boolean;
  onReady?: () => void;
};

const MIN_IFRAME_HEIGHT = 120;

export function XEmbed({
  url,
  hideConversation,
  compact = false,
  onReady,
}: XEmbedProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reportedRef = useRef(false);

  useEffect(() => {
    reportedRef.current = false;
  }, [url]);

  useEffect(() => {
    if (!onReady) return;

    const node = rootRef.current;
    if (!node) return;

    const reportReady = () => {
      if (reportedRef.current) return;
      reportedRef.current = true;
      onReady();
    };

    const hasRenderedTweet = () => {
      const iframe = node.querySelector("iframe");
      if (!iframe) return false;
      const height = iframe.getBoundingClientRect().height;
      return height >= MIN_IFRAME_HEIGHT;
    };

    const observer = new MutationObserver(() => {
      if (hasRenderedTweet()) reportReady();
    });

    observer.observe(node, { childList: true, subtree: true, attributes: true });

    const poll = window.setInterval(() => {
      if (hasRenderedTweet()) reportReady();
    }, 200);

    const fallback = window.setTimeout(reportReady, 8_000);

    return () => {
      observer.disconnect();
      window.clearInterval(poll);
      window.clearTimeout(fallback);
    };
  }, [onReady, url]);

  return (
    <div
      ref={rootRef}
      className={
        compact
          ? "flex w-full justify-center overflow-hidden [&_.twitter-tweet]:!m-0 [&_.twitter-tweet]:!scale-[0.92] [&_.twitter-tweet]:!origin-top"
          : "flex w-full justify-center overflow-hidden"
      }
    >
      <blockquote
        className="twitter-tweet"
        data-theme="light"
        data-dnt="true"
        {...(hideConversation ? { "data-conversation": "none" } : {})}
      >
        <a href={url} />
      </blockquote>
    </div>
  );
}
