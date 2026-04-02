import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  "Explain payment clause",
  "Summarize document",
  "Check risk level",
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello. I am here to help you understand this document. Ask me anything about the clauses, risks, or obligations it contains.",
  },
];

function simulateResponse(userMessage: string): string {
  const lc = userMessage.toLowerCase();
  if (lc.includes("payment")) {
    return "The payment clause in section 3 specifies net-30 payment terms with a 1.5% monthly interest rate on late payments (18% annually). This rate is on the higher end for commercial agreements — verify compliance with your jurisdiction's usury laws before signing.";
  }
  if (lc.includes("summar")) {
    return "This is a 12-month commercial services agreement with automatic annual renewal. Key provisions include net-30 payment terms, 90-day termination notice, and client-unfavorable IP ownership (Service Provider retains all deliverables). Three clauses have been flagged as high risk: unilateral scope modification, auto-renewal window, and IP ownership retention.";
  }
  if (lc.includes("risk")) {
    return "I identified 3 high-risk clauses: (1) unilateral scope modification by the Service Provider, (2) automatic renewal with a 90-day cancellation window, and (3) IP ownership retained by the Service Provider. There are also 2 medium-risk clauses related to late payment interest rate and unilateral amendment power. One low-risk clause covers confidentiality.";
  }
  if (lc.includes("terminat")) {
    return "The agreement allows the Service Provider to terminate immediately for breach. However, the Client must provide 90 days written notice to terminate — regardless of circumstances. This asymmetry favors the Service Provider. Consider negotiating for a mutual 30-day termination-for-convenience clause.";
  }
  return "Based on my analysis of the document, this is a standard commercial provision. I recommend having your legal counsel review it in the context of the full agreement. Would you like me to explain a specific clause or risk in more detail?";
}

export default function Assist() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: simulateResponse(content),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-assist">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground" data-testid="text-assist-title">
              Ask about this document
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Service Agreement — January 2025
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocation("/dashboard")}
              className="interactive-button interactive-button-secondary rounded-md border border-border bg-white px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              data-testid="button-mode-dashboard"
            >
              Dashboard Mode
            </button>
            <button
              onClick={() => setLocation("/assist")}
              className="interactive-button interactive-button-primary rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
              data-testid="button-mode-assist"
            >
              Assist Mode
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6">
        <div className="interactive-surface interactive-panel flex flex-col rounded-lg border border-border bg-white shadow-[var(--shadow-xs)]" style={{ height: "calc(100vh - 220px)", minHeight: "480px" }}>
          <div className="px-4 py-3 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">Legal Assistant</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-green-50 text-green-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Active
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5" data-testid="assist-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                data-testid={`message-${msg.id}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.role === "assistant" ? "bg-primary" : "bg-card border border-border"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <User className="w-4 h-4 text-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] md:max-w-[60%] px-4 py-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-card text-foreground border border-border rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="px-4 py-3 rounded-lg bg-card border border-border rounded-tl-sm" data-testid="typing-indicator">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 pb-4 pt-3 flex-shrink-0 border-t border-border space-y-3">
            <div className="flex flex-wrap gap-2" data-testid="quick-prompts">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="interactive-chip rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                  data-testid={`button-prompt-${prompt.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about this document..."
                className="flex-1 px-3 py-2.5 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground"
                data-testid="input-assist-message"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="interactive-button interactive-button-primary flex-shrink-0 rounded-md bg-primary p-2.5 text-primary-foreground disabled:opacity-50"
                data-testid="button-assist-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
