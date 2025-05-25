import { useState } from "react";
import FilterTabs from "@/components/FilterTabs";
import CryptoGrid from "@/components/CryptoGrid";
import useCryptoData from "@/hooks/useCryptoData";
import { useToast } from "@/hooks/use-toast";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { cryptoData, isLoading, error } = useCryptoData(activeFilter);
  const { toast } = useToast();

  // Available filters
  const filters = [
    { id: "all", label: "All Blockchains" },
    { id: "bitcoin", label: "Bitcoin Family" },
    { id: "ethereum", label: "Ethereum" },
    { id: "defi", label: "Smart Contracts" },
    { id: "privacy", label: "Privacy Coins" },
  ];

  // Show error toast if there's an error
  if (error) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gradient py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">        <header className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 italic ">
            <LineShadowText shadowColor="#ffffff">Blockchain</LineShadowText> <span className="not-italic">Explorer</span>
          </h1>
          
          <p className="text-gray-400">
            Real-time data from major cryptocurrency blockchains
          </p>
        </header>

        <FilterTabs
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filters={filters}
        />

        {isLoading && cryptoData.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-white text-xl">Loading blockchain data...</div>
          </div>
        ) : (
          <CryptoGrid cryptocurrencies={cryptoData} isLoading={isLoading} />
        )}        <footer className="mt-12 space-y-6">
          {/* Footer Text */}
          <div className="text-center text-gray-500 text-sm">
            <p>Data provided by Blockchair API • Updated every 30 minutes</p>
            <p className="mt-2 text-xs">
              {import.meta.env.VITE_BLOCKCHAIR_API_KEY ? 
                "✅ API Key configured - Premium features enabled" : 
                "⚠️ No API key - Using free tier limits"
              }
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
