import Icon from "./Icon";

/* Friendly empty / no-data state used across tables and result pages. */
const EmptyState = ({ icon = "fileText", title, description, action }) => (
  <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
      <Icon name={icon} className="h-6 w-6" />
    </span>
    <h3 className="mt-4 text-sm font-semibold text-neutral-900">{title}</h3>
    {description && (
      <p className="mt-1 max-w-sm text-sm text-neutral-500">{description}</p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
