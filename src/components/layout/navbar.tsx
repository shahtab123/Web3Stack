"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Github, Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { isNavActive, primaryNav, SITE } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  label,
  shortLabel,
  pathname,
  mobile = false,
  onClick,
}: {
  href: string;
  label: string;
  shortLabel: string;
  pathname: string;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const active = isNavActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-md px-1.5 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 lg:rounded-lg lg:px-2 lg:py-1.5 lg:text-sm",
        mobile && "px-3 py-2 text-base",
        active
          ? "bg-surface-active font-medium text-foreground"
          : "text-muted hover:bg-surface-hover hover:text-foreground",
      )}
    >
      {mobile ? (
        label
      ) : (
        <>
          <span className="xl:hidden">{shortLabel}</span>
          <span className="hidden xl:inline">{label}</span>
        </>
      )}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bar = (
    <div
      className={cn(
        "mx-auto flex h-11 w-full max-w-[1280px] items-center gap-1.5 px-2 sm:gap-2 sm:px-3",
        scrolled ? "h-10" : "h-11",
      )}
    >
      <nav
        aria-label="Primary"
        className="hidden min-w-0 flex-1 items-center gap-0.5 overflow-x-auto scrollbar-none md:flex"
      >
        {primaryNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            shortLabel={item.shortLabel}
            pathname={pathname}
          />
        ))}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-1 border-l border-border pl-1.5 sm:gap-1.5 sm:pl-2">
        <ThemeToggle />

        <Button
          variant="ghost"
          size="sm"
          className="hidden h-7 w-7 px-0 text-muted hover:bg-surface-hover hover:text-foreground md:inline-flex lg:h-8 lg:w-auto lg:px-2"
          asChild
        >
          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="size-3.5 lg:size-4" />
            <span className="hidden xl:inline">GitHub</span>
          </a>
        </Button>

        <Button
          size="sm"
          className="hidden h-7 bg-primary px-2 text-xs text-primary-foreground hover:bg-primary-hover md:inline-flex lg:h-8 lg:px-3 lg:text-sm"
          asChild
        >
          <Link href={SITE.submitUrl}>
            <span className="hidden lg:inline">Submit Resource</span>
            <span className="lg:hidden">Submit</span>
          </Link>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-border bg-surface text-foreground hover:bg-surface-hover md:hidden"
            >
              <Menu className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-border bg-background text-foreground">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
              {primaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  shortLabel={item.shortLabel}
                  pathname={pathname}
                  mobile
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4">
              <ThemeToggle className="mb-2 inline-flex w-full justify-center md:hidden" />
              <Button variant="outline" className="w-full" asChild>
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <Github className="size-4" />
                  GitHub
                </a>
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-hover" asChild>
                <Link href={SITE.submitUrl} onClick={() => setOpen(false)}>
                  Submit Resource
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );

  const shellClass = cn(
    "fixed inset-x-0 top-0 z-50 px-3 sm:px-4",
    scrolled ? "pt-2" : "pt-3",
  );

  const panelClass = cn(
    "mx-auto max-w-[1280px] rounded-xl border border-border shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:shadow-black/30 sm:rounded-2xl",
  );

  if (reduceMotion) {
    return (
      <header className={shellClass}>
        <div
          className={panelClass}
          style={{
            backgroundColor: scrolled
              ? "var(--navbar-bg-scrolled)"
              : "var(--navbar-bg)",
          }}
        >
          {bar}
        </div>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={shellClass}
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "var(--navbar-bg-scrolled)"
            : "var(--navbar-bg)",
        }}
        transition={{ duration: 0.25 }}
        className={panelClass}
      >
        {bar}
      </motion.div>
    </motion.header>
  );
}
