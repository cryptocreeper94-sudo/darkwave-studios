import * as React from "react";
import { cn } from "@/lib/utils";

type GlassCardVariant = "default" | "stat" | "feature" | "elevated";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  variant?: GlassCardVariant;
}

const variantStyles: Record<GlassCardVariant, string> = {
  default: "glass-card-surface backdrop-blur-2xl border rounded-xl",
  stat: "glass-card-surface-subtle backdrop-blur-xl border rounded-xl",
  feature: "glass-card-surface-feature backdrop-blur-xl border rounded-xl",
  elevated: "glass-card-surface backdrop-blur-2xl border rounded-xl shadow-[0_0_40px_rgba(0,255,255,0.15)]",
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = false, variant = "default", children, ...props }, ref) => {
    if (glow) {
      return (
        <div className="relative group">
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          <div
            ref={ref}
            className={cn(
              variantStyles[variant],
              "relative transition-all duration-300 hover:border-cyan-500/30 shadow-2xl hover:shadow-[0_0_60px_rgba(6,182,212,0.2)]",
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
          "transition-all duration-300 hover:border-white/20",
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
