import { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
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
    content: "Hello. I can help you understand this document. Ask me anything about the clauses, risks, or obligations it contains.",
    timestamp: new Date(),
  },
];

interface LegalChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalChatbot({ isOpen, onClose }: LegalChatbotProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateResponse = (userMessage: string): string => {
    if (userMessage.toLowerCase().includes("payment")) {
      return "The payment clause in section 4.2 specifies net-30 payment terms. Late payments accrue interest at 1.5% per month. This is standard for commercial contracts, though the interest rate is on the higher end.";
    }
    if (userMessage.toLowerCase().includes("summar")) {
      return "This is a commercial services agreement between two parties. Key terms include: 12-month initial term with auto-renewal, net-30 payment terms, 90-day termination notice requirement, and a limitation of liability capped at 12 months of fees. There are three clauses flagged as high risk.";
    }
    if (userMessage.toLowerCase().includes("risk")) {
      return "I identified 3 high-risk clauses, 2 medium-risk, and 1 low-risk clause. The highest concerns are the broad indemnification clause (Section 7), the unilateral amendment provision (Section 12.1), and the auto-renewal with short cancellation window (Section 2.3).";
    }
    return "Based on my analysis of the document, this clause appears to be a standard provision. However, I recommend having your legal counsel review it given the broader contractual context. Is there a specific aspect you would like me to explain further?";
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: simulateResponse(content),
        timestamp: new Date(),
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed right-0 top-0 h-full w-full sm:w-[380px] bg-white border-l border-border shadow-[var(--shadow-xl)] z-50 flex flex-col"
      data-testid="drawer-chatbot"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm text-foreground">Legal Assistant</span>
        </div>
        <button
          onClick={onClose}
          className="interactive-icon rounded-md border border-transparent p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
          data-testid="button-close-chatbot"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" data-testid="chatbot-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            data-testid={`message-${msg.id}`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                msg.role === "assistant" ? "bg-primary" : "bg-secondary border border-border"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              ) : (
                <User className="w-3.5 h-3.5 text-foreground" />
              )}
            </div>
            <div
              className={`max-w-[78%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
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
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="px-3 py-2 rounded-lg bg-card border border-border rounded-tl-sm">
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

      <div className="px-4 pb-4 pt-2 flex-shrink-0 border-t border-border space-y-3">
        <div className="flex flex-wrap gap-2" data-testid="quick-prompts">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="interactive-chip rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              data-testid={`button-quick-prompt-${prompt.toLowerCase().replace(/\s+/g, "-")}`}
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
            className="flex-1 px-3 py-2 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground"
            data-testid="input-chatbot-message"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="interactive-button interactive-button-primary flex-shrink-0 rounded-md bg-primary p-2 text-primary-foreground disabled:opacity-50"
            data-testid="button-chatbot-send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
