"use client";

import { useMemo, useState } from "react";
import type { StockCandlePoint } from "@/lib/stock-market/types";
import { cn } from "@/lib/utils";

type StockPriceChartProps = {
  data: StockCandlePoint[];
  positive?: boolean;
};

const RANGES = [
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "6M", days: 180 },
] as const;

export function StockPriceChart({ data, positive = true }: StockPriceChartProps) {
  const [range, setRange] = useState<(typeof RANGES)[number]["label"]>("3M");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const visibleData = useMemo(() => {
    const days = RANGES.find((item) => item.label === range)?.days ?? 90;
    return data.slice(-days);
  }, [data, range]);

  if (visibleData.length < 2) {
    return (
      <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-neutral-200 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        Chart unavailable
      </div>
    );
  }

  const width = 760;
  const height = 240;
  const padding = { top: 16, right: 16, bottom: 28, left: 16 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const closes = visibleData.map((point) => point.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const rangeValue = max - min || 1;

  const points = visibleData.map((point, index) => {
    const x =
      padding.left + (index / (visibleData.length - 1)) * chartWidth;
    const y =
      padding.top +
      chartHeight -
      ((point.close - min) / rangeValue) * chartHeight;
    return { x, y, point, index };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? padding.left} ${padding.top + chartHeight} L ${points[0]?.x ?? padding.left} ${padding.top + chartHeight} Z`;

  const hoverPoint = hoverIndex == null ? null : points[hoverIndex];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          {hoverPoint
            ? new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(hoverPoint.point.time * 1000))
            : "Price history"}
        </div>
        <div className="flex gap-1">
          {RANGES.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setRange(item.label)}
              className={cn(
                "rounded px-2 py-1 text-[11px] transition-colors",
                range === item.label
                  ? "bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
                  : "text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-900/30">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[320px]"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {[0, 0.5, 1].map((ratio) => {
            const y = padding.top + chartHeight * ratio;
            return (
              <line
                key={ratio}
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-neutral-200 dark:text-neutral-800"
                strokeWidth="1"
              />
            );
          })}

          <path
            d={areaPath}
            className={cn(
              positive ? "fill-emerald-500/10" : "fill-red-500/10",
            )}
          />
          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={cn(positive ? "text-emerald-500" : "text-red-500")}
          />

          {points.map(({ x, y, index }) => (
            <rect
              key={index}
              x={x - chartWidth / visibleData.length / 2}
              y={padding.top}
              width={chartWidth / visibleData.length}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(index)}
            />
          ))}

          {hoverPoint && (
            <>
              <line
                x1={hoverPoint.x}
                x2={hoverPoint.x}
                y1={padding.top}
                y2={padding.top + chartHeight}
                stroke="currentColor"
                className="text-neutral-400"
                strokeDasharray="4 4"
              />
              <circle
                cx={hoverPoint.x}
                cy={hoverPoint.y}
                r="4"
                className={cn(
                  positive ? "fill-emerald-500" : "fill-red-500",
                )}
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
