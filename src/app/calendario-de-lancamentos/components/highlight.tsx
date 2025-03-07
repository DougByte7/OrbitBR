"use client";

import clsx from "clsx";
import { useRef, useLayoutEffect } from "react";

export default function Highlight() {
  const highlightRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const highlight = highlightRef.current;
    if (!highlight) return;

    const height = highlight.getBoundingClientRect().height;
    highlight.style.setProperty("--height", `${height * 2}px`);
    highlight.style.setProperty("--offset", `calc(50% - ${height}px)`);
  });

  return (
    <i
      ref={highlightRef}
      aria-hidden
      className={clsx(
        "absolute inset-0 -z-10 block h-full overflow-hidden rounded-sm p-0.5",
        "![mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,_linear-gradient(#fff_0_0)]",
        "before:absolute before:-top-1/2 before:left-[var(--offset)] before:block before:aspect-square before:h-[var(--height)] before:rounded-full before:bg-[conic-gradient(transparent,hsl(var(--primary)),transparent,transparent,transparent,#17F62D,transparent,transparent,transparent)]",
        "before:animate-spin before:[animation-duration:5s]",
      )}
    />
  );
}
