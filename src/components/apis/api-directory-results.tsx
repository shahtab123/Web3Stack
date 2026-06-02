"use client";

import { ApiCard } from "@/components/apis/api-card";
import { ApiListRow } from "@/components/apis/api-list-row";
import {
  ApiDirectoryToolbar,
  useApiDirectoryView,
} from "@/components/apis/api-directory-toolbar";
import type { ApiEntry } from "@/lib/api-directory";
import { cn } from "@/lib/utils";

type ApiDirectoryResultsProps = {
  apis: ApiEntry[];
};

export function ApiDirectoryResults({ apis }: ApiDirectoryResultsProps) {
  const [view, setView] = useApiDirectoryView();

  return (
    <div className="space-y-4">
      <ApiDirectoryToolbar
        resultCount={apis.length}
        view={view}
        onViewChange={setView}
      />

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {apis.map((api) => (
            <ApiCard key={api.slug} api={api} />
          ))}
        </div>
      ) : (
        <div className={cn("space-y-3")}>
          {apis.map((api) => (
            <ApiListRow key={api.slug} api={api} />
          ))}
        </div>
      )}
    </div>
  );
}
