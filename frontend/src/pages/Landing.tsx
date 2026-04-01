import { useLocation } from "wouter";
import { FileText, ShieldAlert, Lightbulb, ArrowRight, Upload } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white" data-testid="page-landing">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight" data-testid="text-hero-title">
            Simplify Legal Documents Instantly
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl" data-testid="text-hero-subtitle">
            Upload contracts and understand key clauses, risks, and obligations in simple language.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setLocation("/upload")}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
              data-testid="button-hero-upload"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
            <button
              onClick={() => setLocation("/dashboard")}
              className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded-md hover:bg-accent transition-colors"
              data-testid="button-hero-dashboard"
            >
              View Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-border rounded-lg p-6 shadow-[var(--shadow-xs)]" data-testid="card-feature-clause">
              <div className="w-10 h-10 rounded-md bg-primary/8 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">Clause Classification</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Automatically identifies key clauses such as payment, termination, and liability.
              </p>
            </div>

            <div className="bg-white border border-border rounded-lg p-6 shadow-[var(--shadow-xs)]" data-testid="card-feature-risk">
              <div className="w-10 h-10 rounded-md bg-primary/8 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">Risk Detection</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Highlights potentially risky terms using explainable logic.
              </p>
            </div>

            <div className="bg-white border border-border rounded-lg p-6 shadow-[var(--shadow-xs)]" data-testid="card-feature-ai">
              <div className="w-10 h-10 rounded-md bg-primary/8 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">AI Explanation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Provides simplified explanations of legal language.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-foreground">LexiScan</span>
          <div className="flex items-center gap-5">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
