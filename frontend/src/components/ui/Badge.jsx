import { cn } from "./cn";

/* Small status pill. Tones map to semantic meaning, not raw colors. */
const tones = {
  neutral: "bg-neutral-100 text-neutral-700 ring-neutral-200",
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  danger: "bg-red-50 text-red-700 ring-red-200",
  info: "bg-sky-50 text-sky-700 ring-sky-200",
};

const Badge = ({ tone = "neutral", icon, className, children }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
      tones[tone],
      className
    )}
  >
    {icon}
    {children}
  </span>
);

export default Badge;
