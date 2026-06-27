import { useId } from "react";
import { cn } from "./cn";

/*
  Labelled text input with optional leading icon.
  Always renders a <label htmlFor> so the field is reachable by screen readers
  and clickable by label — and a consistent focus ring + sizing.
*/

const Input = ({
  label,
  icon,
  id,
  className,
  containerClassName,
  hint,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 shadow-soft",
            "placeholder:text-neutral-400 transition-all duration-200",
            "hover:border-neutral-300",
            "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40",
            icon ? "pl-10 pr-3.5" : "px-3.5",
            className
          )}
          {...props}
        />
      </div>
      {hint && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  );
};

export default Input;
