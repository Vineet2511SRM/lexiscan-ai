import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Upload, Menu, X } from "lucide-react";

interface NavbarProps {
  onUploadClick?: () => void;
}

export default function Navbar({ onUploadClick }: NavbarProps) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Assist", href: "/assist" },
  ];

  const handleUploadClick = () => {
    if (onUploadClick) {
      onUploadClick();
    } else {
      setLocation("/upload");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/90 backdrop-blur-sm" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 interactive-link" data-testid="link-logo">
            <span className="text-lg font-semibold tracking-tight text-primary">LexiScan</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`interactive-link px-3 py-1.5 rounded-md text-sm font-medium ${
                  location === link.href
                    ? "bg-accent text-foreground shadow-[var(--shadow-2xs)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleUploadClick}
              className="interactive-button interactive-button-primary hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md"
              data-testid="button-upload-document"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>

            <button
              className="interactive-icon md:hidden rounded-md border border-transparent p-2 text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white" data-testid="nav-mobile">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`interactive-link block px-3 py-2 rounded-md text-sm font-medium ${
                  location === link.href
                    ? "bg-accent text-foreground shadow-[var(--shadow-2xs)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { handleUploadClick(); setMobileMenuOpen(false); }}
              className="interactive-button interactive-button-primary mt-2 flex w-full items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              data-testid="button-mobile-upload"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
