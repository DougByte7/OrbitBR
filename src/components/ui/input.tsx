import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftSection, rightSection, ...props }, ref) => {
    return (
      <span
        className={cn(
          "border-input/10 shadow-[0px_0px_48px_8px_rgba(0, 0, 0, 0.25)] ring-offset-background inline-flex w-full gap-3 rounded-md border bg-black/5 p-3 text-sm",
          "focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2",
          className,
        )}
      >
        {leftSection}
        <input
          className={cn(
            "bg-transparent",
            "placeholder:text-foreground",
            "focus-visible:outline-none",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          type={type}
          ref={ref}
          {...props}
        />
        {rightSection}
      </span>
    );
  },
);
Input.displayName = "Input";

export { Input };
