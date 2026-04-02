import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type RiskLevel = "high" | "medium" | "low";

export interface RiskCardData {
  id: string;
  title: string;
  preview: string;
  risk: RiskLevel;
  explanation: string;
}

interface RiskCardProps {
  card: RiskCardData;
}

const riskConfig: Record<RiskLevel, { label: string; bg: string; text: string; dot: string }> = {
  high: {
    label: "High Risk",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-400",
  },
  medium: {
    label: "Medium Risk",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  low: {
    label: "Low Risk",
    bg: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-400",
  },
};

export default function RiskCard({ card }: RiskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const config = riskConfig[card.risk];

  return (
    <div
      className="interactive-surface interactive-card space-y-3 rounded-lg border border-border bg-white p-4 shadow-[var(--shadow-2xs)]"
      data-testid={`card-risk-${card.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate" data-testid={`text-clause-title-${card.id}`}>
            {card.title}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2" data-testid={`text-clause-preview-${card.id}`}>
            {card.preview}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap flex-shrink-0 ${config.bg} ${config.text}`}
          data-testid={`tag-risk-${card.id}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="interactive-link flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
        data-testid={`button-why-${card.id}`}
      >
        {expanded ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" />
            Hide explanation
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" />
            Why is this flagged?
          </>
        )}
      </button>

      {expanded && (
        <div className="pt-2 border-t border-border" data-testid={`text-explanation-${card.id}`}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {card.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
