import { cn } from "./cn";

/*
  Card surface + optional structured header.
  Consistent radius (rounded-2xl), hairline border and soft shadow give the
  whole app a single, calm surface treatment instead of ad-hoc shadows.
*/

export const Card = ({ className, as: Component = "div", ...props }) => (
  <Component
    className={cn(
      "rounded-2xl border border-neutral-200 bg-white shadow-card",
      className
    )}
    {...props}
  />
);

export const CardHeader = ({ icon, title, description, action, className }) => (
  <div
    className={cn(
      "flex items-start justify-between gap-4 border-b border-neutral-100 p-5 sm:p-6",
      className
    )}
  >
    <div className="flex items-start gap-3">
      {icon && (
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          {icon}
        </span>
      )}
      <div>
        <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-neutral-500">{description}</p>
        )}
      </div>
    </div>
    {action}
  </div>
);

export const CardBody = ({ className, ...props }) => (
  <div className={cn("p-5 sm:p-6", className)} {...props} />
);

export default Card;
