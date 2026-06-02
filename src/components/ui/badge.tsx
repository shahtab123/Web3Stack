import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "muted" }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variant === "default" &&
          "bg-primary text-primary-foreground",
        variant === "outline" &&
          "border border-border text-foreground",
        variant === "muted" &&
          "bg-surface text-muted",
        className,
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
