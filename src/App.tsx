import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlockchainStats from "./pages/BlockchainStats";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 30 minutes
      staleTime: 30 * 60 * 1000, // 30 minutes
      // Keep data in cache for 1 hour
      gcTime: 60 * 60 * 1000, // 1 hour
      // Retry failed requests
      retry: 2,
      // Don't refetch on window focus to save API calls
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect unless data is really stale
      refetchOnReconnect: 'always',
      // Background refetch interval - every 30 minutes
      refetchInterval: 30 * 60 * 1000, // 30 minutes
      // Only background refetch when window is focused
      refetchIntervalInBackground: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>        <Routes>
          <Route path="/" element={<Index />} />
          {/* Blockchain stats routes */}
          <Route path="/:blockchain" element={<BlockchainStats />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
