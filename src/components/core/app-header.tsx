import { StyleShiftLogo } from '@/components/core/styleshift-logo';

export function AppHeader() {
  return (
    <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StyleShiftLogo className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-headline font-bold tracking-tight text-foreground">
            StyleShift
          </h1>
        </div>
        {/* Future navigation or actions can go here */}
      </div>
    </header>
  );
}
