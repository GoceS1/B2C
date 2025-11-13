import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-primary text-white hover:shadow-lg hover:scale-[1.02]":
              variant === "default",
            "border-2 border-primary text-primary hover:bg-surface":
              variant === "outline",
            "hover:bg-surface text-text-primary": variant === "ghost",
            "h-11 px-8 text-base": size === "default",
            "h-9 px-4 text-sm": size === "sm",
            "h-14 px-10 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

