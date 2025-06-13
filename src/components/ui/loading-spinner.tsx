import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: number | string; // Allow string for Tailwind sizes like "h-5 w-5"
  text?: string;
}

export function LoadingSpinner({ className, size = 24, text }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Loader2
        className={cn(
          "animate-spin text-primary",
          typeof size === 'string' ? size : ''
        )}
        size={typeof size === 'number' ? size : undefined}
        aria-label="Loading..."
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
