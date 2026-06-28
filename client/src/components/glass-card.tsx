import * as React from "react";
import { cn } from "@/lib/utils";

type GlassCardVariant = "default" | "stat" | "feature" | "elevated";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  variant?: GlassCardVariant;
}

const variantStyles: Record<GlassCardVariant, string> = {
  default: "bg-[#0a0a0a] border border-white/[0.08] rounded-sm",
  stat: "bg-[#0a0a0a] border border-white/[0.08] rounded-sm",
  feature: "bg-[#0f0f0f] border border-white/[0.1] rounded-sm",
  elevated: "bg-[#0a0a0a] border border-white/[0.1] rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = false, variant = "default", children, ...props }, ref) => {
    if (glow) {
      return (
        <div className="relative group">
          <div className="absolute -inset-[1px] rounded-sm bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          <div
            ref={ref}
            className={cn(
              variantStyles[variant],
              "relative transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
              className
            )}
            {...props}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          variantStyles[variant],
          "transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
export type { GlassCardProps, GlassCardVariant };
