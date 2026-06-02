import type { Tool } from "@/db/schema";
import { formatCategory, formatPricing } from "@/lib/constants";
import Link from "next/link";
import { Star } from "lucide-react";

type ToolsTableProps = {
  tools: Tool[];
};

export function ToolsTable({ tools }: ToolsTableProps) {
  if (tools.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No tools match your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
            <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
              Name
            </th>
            <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
              Category
            </th>
            <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
              Pricing
            </th>
            <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
              Tags
            </th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr
              key={tool.id}
              className="border-b border-neutral-100 transition-colors last:border-0 hover:bg-neutral-50 dark:border-neutral-900 dark:hover:bg-neutral-900/50"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group inline-flex items-center gap-2 font-medium hover:underline"
                >
                  {tool.name}
                  {tool.featured && (
                    <Star className="size-3 fill-neutral-950 dark:fill-neutral-50" />
                  )}
                </Link>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {tool.tagline}
                </p>
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                {formatCategory(tool.category)}
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                {formatPricing(tool.pricing)}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-neutral-500 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
