import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { SITE } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function AppFooter() {
  return (
    <footer className="site-footer py-3">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
        <p className="text-xs sm:text-sm">
          {SITE.name} · Free & freemium tools only
        </p>

        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <Link
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-muted transition-colors hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            )}
          >
            GitHub
          </Link>
          <Link
            href={SITE.contributorsUrl}
            className={cn(
              "text-muted transition-colors hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            )}
          >
            Contributors
          </Link>
          <Link
            href={SITE.submitUrl}
            className={cn(
              "text-muted transition-colors hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            )}
          >
            Submit Resource
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="discover-bg flex min-h-screen flex-col text-foreground">
      <Navbar />
      <main className="relative mx-auto w-full max-w-[1280px] flex-1 px-4 pb-8 pt-24 sm:px-6 sm:pt-28">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
