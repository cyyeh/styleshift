export function AppFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/50 py-8 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} StyleShift. All rights reserved.</p>
        <p className="mt-1">Powered by Firebase and Genkit AI.</p>
      </div>
    </footer>
  );
}
