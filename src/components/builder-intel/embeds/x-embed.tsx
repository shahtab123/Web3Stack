"use client";

type XEmbedProps = {
  url: string;
  hideConversation?: boolean;
  compact?: boolean;
};

export function XEmbed({ url, hideConversation, compact = false }: XEmbedProps) {
  return (
    <div
      className={
        compact
          ? "flex w-full justify-center overflow-hidden [&_.twitter-tweet]:!m-0 [&_.twitter-tweet]:!scale-[0.92] [&_.twitter-tweet]:!origin-top"
          : "flex min-h-[200px] w-full justify-center overflow-hidden"
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
