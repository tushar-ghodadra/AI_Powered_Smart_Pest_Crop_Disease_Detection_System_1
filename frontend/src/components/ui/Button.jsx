import { cn } from "./cn";
import Spinner from "./Spinner";

/*
  Button
  ------
  One component, a few intents and sizes. Centralises focus rings, disabled
  states, transitions and loading affordance so every button in the app is
  consistent and accessible. Polymorphic via `as` (e.g. render a router Link).

  Micro-interactions: a soft lift on hover and a subtle press (active:scale).
  Primary buttons also get a one-shot light "sheen" sweep on hover.
*/

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold rounded-xl " +
  "transition-all duration-200 select-none whitespace-nowrap " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:shadow-glow " +
    "active:bg-brand-800 focus-visible:ring-brand-500",
  secondary:
    "bg-white text-neutral-700 border border-neutral-200 shadow-soft " +
    "hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-md active:bg-neutral-100 " +
    "focus-visible:ring-neutral-400",
  ghost:
    "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 " +
    "active:bg-neutral-200 focus-visible:ring-neutral-400 hover:translate-y-0",
  danger:
    "bg-red-600 text-white shadow-soft hover:bg-red-700 hover:shadow-md active:bg-red-800 " +
    "focus-visible:ring-red-500",
};

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = ({
  as: Component = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}) => {
  const isButton = Component === "button";

  return (
    <Component
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={isButton ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[130%] -skew-x-12 bg-white/25 blur-[1px] group-hover:animate-sheen"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {loading && <Spinner className="h-4 w-4" />}
        {children}
      </span>
    </Component>
  );
};

export default Button;
