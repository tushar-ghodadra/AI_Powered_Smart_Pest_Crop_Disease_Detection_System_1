import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/*
  Animates a number from 0 to `target` with requestAnimationFrame.
  - Non-numeric targets (e.g. a disease name) are returned untouched.
  - Honours prefers-reduced-motion by snapping straight to the value.
  - `decimals` controls rounding so percentages/integers read cleanly.
*/
export function useCountUp(target, { duration = 1100, decimals = 0 } = {}) {
  const numeric = typeof target === "number" ? target : Number(target);
  const isNumber = target !== null && target !== "" && !Number.isNaN(numeric);
  const reduced = useReducedMotion();
  const animate = isNumber && !reduced;

  // `value` is only consulted while animating; otherwise we return the target
  // directly, so state is updated exclusively inside the rAF callback (never
  // synchronously in the effect).
  const [value, setValue] = useState(animate ? 0 : numeric);
  const frame = useRef(0);

  useEffect(() => {
    if (!animate) return;

    let startTs = 0;
    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      setValue(numeric * easeOutCubic(progress));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [numeric, animate, duration]);

  if (!isNumber) return target;

  const factor = 10 ** decimals;
  const current = animate ? value : numeric;
  return Math.round(current * factor) / factor;
}
