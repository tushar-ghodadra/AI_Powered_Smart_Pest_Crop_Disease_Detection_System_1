import { cn } from "./cn";

/*
  Page scaffolding: a constrained, centered content column with consistent
  vertical rhythm and responsive padding — so every screen lines up the same way.
  `width` controls the max content width per page (narrow forms vs wide tables).
*/

const widths = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
};

export const Page = ({ width = "xl", className, children }) => (
  <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
    <div className={cn("mx-auto w-full", widths[width], className)}>
      {children}
    </div>
  </div>
);

export const PageHeader = ({ eyebrow, title, description, action, className }) => (
  <div
    className={cn(
      "mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between",
      className
    )}
  >
    <div>
      {eyebrow && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
          {eyebrow}
        </p>
      )}
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-1.5 max-w-2xl text-sm text-neutral-500 sm:text-base">
          {description}
        </p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default Page;
