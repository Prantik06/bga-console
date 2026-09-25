import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  accent?: "owner" | "legacy" | "legend" | "empire" | "neutral";
}

const accentMap: Record<string, string> = {
  owner: "bg-owner text-[#1A1206] hover:bg-owner/90",
  legacy: "bg-legacy text-[#04151C] hover:bg-legacy/90",
  legend: "bg-legend text-[#150B2C] hover:bg-legend/90",
  empire: "bg-empire text-[#210410] hover:bg-empire/90",
  neutral: "bg-panel-raised text-text-primary hover:bg-[#1D2438]",
};

const outlineAccentMap: Record<string, string> = {
  owner: "border-owner/40 text-owner hover:bg-owner/10",
  legacy: "border-legacy/40 text-legacy hover:bg-legacy/10",
  legend: "border-legend/40 text-legend hover:bg-legend/10",
  empire: "border-empire/40 text-empire hover:bg-empire/10",
  neutral: "border-border text-text-primary hover:bg-panel-raised",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", accent = "neutral", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none",
          variant === "solid" && accentMap[accent],
          variant === "outline" && clsx("border bg-transparent", outlineAccentMap[accent]),
          variant === "ghost" && "bg-transparent text-text-muted hover:text-text-primary hover:bg-panel-raised",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
