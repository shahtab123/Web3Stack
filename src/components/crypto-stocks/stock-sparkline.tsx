import type { StockCandlePoint } from "@/lib/stock-market/types";
import { cn } from "@/lib/utils";

type StockSparklineProps = {
  data: StockCandlePoint[];
  positive?: boolean;
  className?: string;
  width?: number;
  height?: number;
};

export function StockSparkline({
  data,
  positive = true,
  className,
  width = 88,
  height = 32,
}: StockSparklineProps) {
  if (data.length < 2) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className={cn("block w-full text-neutral-300 dark:text-neutral-700", className)}
        aria-hidden
      >
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </svg>
    );
  }

  const closes = data.map((point) => point.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const range = max - min || 1;

  const points = closes
    .map((close, index) => {
      const x = (index / (closes.length - 1)) * width;
      const y = height - ((close - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const stroke =
    positive === false
      ? "text-red-500"
      : positive === true
        ? "text-emerald-500"
        : "text-neutral-400";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("block w-full overflow-visible", stroke, className)}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}
