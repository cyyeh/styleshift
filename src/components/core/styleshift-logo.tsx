import type { SVGProps } from 'react';

export function StyleShiftLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="StyleShift Logo"
      {...props}
    >
      <rect width="48" height="48" rx="8" fill="hsl(var(--primary))" />
      <path
        d="M14 34L24 14L34 34"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 26H30"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="3"
        strokeLinecap="round"
      />
       <circle cx="24" cy="24" r="18" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
}
