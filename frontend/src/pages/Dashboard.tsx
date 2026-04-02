import { useState } from "react";
import { useLocation } from "wouter";
import RiskCard, { type RiskCardData, type RiskLevel } from "@/components/RiskCard";

const sampleDocumentText = `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of January 1, 2025, between TechCorp Inc. ("Service Provider") and ClientCo Ltd. ("Client").

1. SERVICES
Service Provider agrees to provide software development and consulting services as described in Exhibit A attached hereto. The scope of services may be modified by Service Provider at its sole discretion with thirty (30) days written notice.

2. TERM AND RENEWAL
This Agreement shall commence on the Effective Date and continue for a period of twelve (12) months. Upon expiration, this Agreement shall automatically renew for successive one-year terms unless either party provides written notice of non-renewal at least ninety (90) days prior to the end of the then-current term.

3. COMPENSATION
Client shall pay Service Provider the fees set forth in Exhibit B within thirty (30) days of receipt of invoice. Late payments shall accrue interest at the rate of one and one-half percent (1.5%) per month.

4. CONFIDENTIALITY
Each party agrees to maintain the confidentiality of the other party's proprietary information for a period of five (5) years following the termination of this Agreement.

5. INTELLECTUAL PROPERTY
All work product, inventions, and deliverables created by Service Provider in connection with this Agreement shall be owned exclusively by Service Provider unless otherwise agreed in writing.

6. LIMITATION OF LIABILITY
IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES. SERVICE PROVIDER'S TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID IN THE THREE (3) MONTHS PRECEDING THE CLAIM.

7. INDEMNIFICATION
Client shall indemnify and hold harmless Service Provider, its officers, directors, employees, and agents from and against any and all claims, damages, losses, costs, and expenses (including attorneys' fees) arising out of or related to Client's use of the services.

8. TERMINATION
Service Provider may terminate this Agreement immediately upon written notice if Client breaches any provision of this Agreement. Client may terminate this Agreement with ninety (90) days written notice.

9. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware.

10. AMENDMENTS
Service Provider reserves the right to modify the terms of this Agreement at any time with thirty (30) days prior notice to Client.`;

const riskCards: RiskCardData[] = [
  {
    id: "1",
    title: "Unilateral Scope Modification",
    preview: "The scope of services may be modified by Service Provider at its sole discretion with thirty (30) days written notice.",
    risk: "high",
    explanation: "This clause allows the Service Provider to change the scope of work without Client consent. This creates significant risk as the Client cannot enforce the originally agreed deliverables. Recommended: Require mutual written consent for scope changes.",
  },
  {
    id: "2",
    title: "Automatic Renewal Clause",
    preview: "This Agreement shall automatically renew for successive one-year terms unless either party provides written notice of non-renewal at least ninety (90) days prior...",
    risk: "high",
    explanation: "The 90-day cancellation window before automatic renewal is unusually long and creates a risk of unintended contract extensions. Many jurisdictions have consumer protection rules around auto-renewal. Recommended: Negotiate a shorter notice period of 30-45 days.",
  },
  {
    id: "3",
    title: "IP Ownership Retention",
    preview: "All work product, inventions, and deliverables created by Service Provider shall be owned exclusively by Service Provider unless otherwise agreed in writing.",
    risk: "high",
    explanation: "Client does not retain ownership of work paid for under this agreement. This is a significant deviation from standard work-for-hire arrangements. The Client would need a license to use the deliverables, which is not specified. Recommended: Negotiate full IP assignment to Client upon payment.",
  },
  {
    id: "4",
    title: "Late Payment Interest Rate",
    preview: "Late payments shall accrue interest at the rate of one and one-half percent (1.5%) per month.",
    risk: "medium",
    explanation: "An interest rate of 1.5% per month equates to 18% annually. While this is a common provision in commercial contracts, it is on the higher end. Verify whether this rate complies with usury laws in your jurisdiction.",
  },
  {
    id: "5",
    title: "Unilateral Amendment Power",
    preview: "Service Provider reserves the right to modify the terms of this Agreement at any time with thirty (30) days prior notice to Client.",
    risk: "medium",
    explanation: "Allowing one party to unilaterally amend the agreement creates imbalance. The Client has no formal right to reject changes and must accept modified terms or exercise termination rights, which require 90 days notice.",
  },
  {
    id: "6",
    title: "Confidentiality Duration",
    preview: "Each party agrees to maintain the confidentiality of the other party's proprietary information for a period of five (5) years following the termination of this Agreement.",
    risk: "low",
    explanation: "A five-year post-termination confidentiality period is standard and reasonable for commercial agreements of this type. This clause appears balanced and protects both parties equally.",
  },
];

type FilterType = "all" | RiskLevel;

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredCards = filter === "all"
    ? riskCards
    : riskCards.filter((c) => c.risk === filter);

  const counts = {
    all: riskCards.length,
    high: riskCards.filter((c) => c.risk === "high").length,
    medium: riskCards.filter((c) => c.risk === "medium").length,
    low: riskCards.filter((c) => c.risk === "low").length,
  };

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "high", label: "High Risk", count: counts.high },
    { key: "medium", label: "Medium Risk", count: counts.medium },
    { key: "low", label: "Low Risk", count: counts.low },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-foreground" data-testid="text-dashboard-title">
              Analysis Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Service Agreement — January 2025
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocation("/dashboard")}
              className="interactive-button interactive-button-primary rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
              data-testid="button-mode-dashboard"
            >
              Dashboard Mode
            </button>
            <button
              onClick={() => setLocation("/assist")}
              className="interactive-button interactive-button-secondary rounded-md border border-border bg-white px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              data-testid="button-mode-assist"
            >
              Assist Mode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3" data-testid="panel-document">
            <div className="interactive-surface interactive-panel overflow-hidden rounded-lg border border-border bg-white shadow-[var(--shadow-xs)]">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">Document Text</h2>
              </div>
              <div className="p-4 h-[560px] overflow-y-auto" data-testid="document-content">
                <pre className="text-xs text-muted-foreground font-sans leading-relaxed whitespace-pre-wrap">
                  {sampleDocumentText}
                </pre>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2" data-testid="panel-analysis">
            <div className="interactive-surface interactive-panel overflow-hidden rounded-lg border border-border bg-white shadow-[var(--shadow-xs)]">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">Clause Analysis</h2>
              </div>

              <div className="px-4 py-3 border-b border-border">
                <div className="flex flex-wrap gap-1.5" data-testid="filter-buttons">
                  {filters.map(({ key, label, count }) => (
                    <button
                      key={key}
                      onClick={() => setFilter(key)}
                      className={`interactive-chip px-3 py-1 text-xs font-medium rounded-md ${
                        filter === key
                          ? "bg-primary text-primary-foreground shadow-[var(--shadow-2xs)]"
                          : "bg-card border border-border text-muted-foreground hover:text-foreground"
                      }`}
                      data-testid={`button-filter-${key}`}
                    >
                      {label} ({count})
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 h-[488px] overflow-y-auto space-y-3" data-testid="risk-cards-list">
                {filteredCards.map((card) => (
                  <RiskCard key={card.id} card={card} />
                ))}
                {filteredCards.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No clauses match this filter.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
