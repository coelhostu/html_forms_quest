import * as React from "react"
import { cn } from "@/lib/utils"

export interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border-b-4 border-r-4 border-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 border-b-4 border-r-4 border-secondary-foreground',
      danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border-b-4 border-r-4 border-destructive-foreground',
      ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground border-2 border-transparent hover:border-foreground',
    };

    const sizes = {
      sm: 'px-3 py-1 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base font-bold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          "pixel-btn font-display uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none transition-all active:translate-y-1 active:translate-x-1 active:border-b-0 active:border-r-0",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
PixelButton.displayName = "PixelButton"

export { PixelButton }
