"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  function select(next: Theme) {
    setTheme(next);
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "hidden items-center rounded-md border border-border bg-surface p-0.5 md:inline-flex",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => select("light")}
        aria-pressed={theme === "light"}
        className={cn(
          "inline-flex min-h-7 min-w-7 items-center justify-center rounded px-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          theme === "light"
            ? "bg-surface-active text-foreground"
            : "text-muted hover:text-foreground",
        )}
      >
        <Sun className="size-3.5" aria-hidden />
        <span className="sr-only">Light</span>
      </button>
      <button
        type="button"
        onClick={() => select("dark")}
        aria-pressed={theme === "dark"}
        className={cn(
          "inline-flex min-h-7 min-w-7 items-center justify-center rounded px-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          theme === "dark"
            ? "bg-surface-active text-foreground"
            : "text-muted hover:text-foreground",
        )}
      >
        <Moon className="size-3.5" aria-hidden />
        <span className="sr-only">Dark</span>
      </button>
    </div>
  );
}
