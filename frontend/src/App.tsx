import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import LegalChatbot from "@/components/LegalChatbot";
import Landing from "@/pages/Landing";
import Upload from "@/pages/Upload";
import Dashboard from "@/pages/Dashboard";
import Assist from "@/pages/Assist";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AppRoutes() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/upload" component={Upload} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/assist" component={Assist} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <button
        onClick={() => setChatOpen(true)}
        className="interactive-button interactive-button-primary fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lg)]"
        data-testid="button-floating-chat"
        aria-label="Open Legal Assistant"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      <LegalChatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {chatOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setChatOpen(false)}
          data-testid="overlay-chatbot"
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppRoutes />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
