import { useEffect, useRef, useState } from "react";
import { cn } from "./cn";

/*
  Reveal
  ------
  Scroll-triggered entrance. Uses a single IntersectionObserver per element to
  flip `data-visible`, which the `.reveal` utility tweens (opacity + translate).
  `delay` lets callers stagger a list without any timers. Animates once, then
  disconnects so it never costs anything on scroll afterwards.
*/
const Reveal = ({
  as: Component = "div",
  delay = 0,
  className,
  children,
  ...props
}) => {
  const ref = useRef(null);
  // If IntersectionObserver is unavailable, render visible from the start so
  // content is never hidden (and we avoid any setState during the effect).
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms`, ...props.style }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Reveal;
