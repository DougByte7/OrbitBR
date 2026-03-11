"use client";

import clsx from "clsx";
import { useRef, useLayoutEffect } from "react";

export default function Highlight() {
  const highlightRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const highlight = highlightRef.current;
    if (!highlight) return;

    function update() {
      if (!highlight) return;
      const { width, height } = highlight.getBoundingClientRect();
      const size = Math.hypot(width, height);
      highlight.style.setProperty("--size", `${size}px`);
      highlight.style.setProperty("--center", `calc(50% - ${size / 2}px)`);
    }

    update();

    const observer = new ResizeObserver(update);
    observer.observe(highlight);
    return () => observer.disconnect();
  }, []);

  return (
    <i
      ref={highlightRef}
      aria-hidden
      className={clsx(
        "pointer-events-none",
        "absolute inset-0 z-10 block h-full overflow-hidden rounded-sm p-0.5",
        "![mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,_linear-gradient(#fff_0_0)]",
        "before:absolute before:top-[var(--center)] before:left-[var(--center)] before:block before:aspect-square before:h-[var(--size)] before:rounded-full before:bg-[conic-gradient(transparent,hsl(var(--primary)),transparent,transparent,transparent,#17F62D,transparent,transparent,transparent)]",
        "before:animate-spin before:[animation-duration:5s]",
      )}
    />
  );
}
