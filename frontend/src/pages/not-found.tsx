import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4" data-testid="page-not-found">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground mb-2">404</p>
        <h1 className="text-2xl font-semibold text-foreground mb-3">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The page you are looking for does not exist.
        </p>
        <button
          onClick={() => setLocation("/")}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
          data-testid="button-go-home"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
