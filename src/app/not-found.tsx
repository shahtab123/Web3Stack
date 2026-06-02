import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-sm uppercase tracking-wide text-neutral-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        The page you are looking for does not exist.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">Back to overview</Link>
      </Button>
    </div>
  );
}
