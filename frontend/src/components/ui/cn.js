/* Tiny classnames joiner — filters out falsy values so we can compose
   conditional Tailwind classes without pulling in a dependency. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
