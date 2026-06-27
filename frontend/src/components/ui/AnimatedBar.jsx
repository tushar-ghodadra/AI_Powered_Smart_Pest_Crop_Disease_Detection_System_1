import { useEffect, useState } from "react";
import { cn } from "./cn";

/*
  Progress bar that tweens its fill from 0 to `value`% on mount.
  Width is animated via a CSS custom property (`--w`) so the transition stays
  on the compositor. The track exposes proper progressbar ARIA.
*/
const AnimatedBar = ({
  value = 0,
  className = "h-2",
  barClassName = "bg-brand-500",
  rounded = "rounded-full",
  label = "Progress",
  trackClassName = "bg-neutral-100",
  delay = 120,
}) => {
  const pct = Math.min(Math.max(Number(value) || 0, 0), 100);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setFill(pct), delay);
    return () => clearTimeout(id);
  }, [pct, delay]);

  return (
    <div
      className={cn("w-full overflow-hidden", rounded, trackClassName, className)}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={cn("bar-fill h-full", rounded, barClassName)}
        style={{ "--w": `${fill}%` }}
      />
    </div>
  );
};

export default AnimatedBar;
