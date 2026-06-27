import { cn } from "./cn";

/* Loading placeholder with a moving shimmer sweep (falls back to a calm
   pulse under reduced-motion via the global media query). */
const Skeleton = ({ className }) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-md bg-neutral-200/70",
      className
    )}
    aria-hidden="true"
  >
    <span className="shimmer animate-shimmer absolute inset-0" />
  </div>
);

export default Skeleton;
