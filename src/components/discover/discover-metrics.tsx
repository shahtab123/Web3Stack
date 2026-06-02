"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { DISCOVER_METRICS } from "@/lib/discover-home-data";
import { FadeIn } from "@/components/discover/motion";

function AnimatedCounter({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    if (!active) return;

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, value]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function DiscoverMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <FadeIn>
      <section
        ref={ref}
        aria-label="Directory metrics"
        className="border-t border-border pt-10"
      >
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {DISCOVER_METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  active={active}
                />
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
