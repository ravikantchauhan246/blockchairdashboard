
import { useState } from "react";
import FilterTabs from "@/components/FilterTabs";
import CryptoGrid from "@/components/CryptoGrid";
<<<<<<< HEAD
import APIStatus from "@/components/APIStatus";
=======
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
import useCryptoData from "@/hooks/useCryptoData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { cryptoData, isLoading, error } = useCryptoData(activeFilter);
  const { toast } = useToast();
<<<<<<< HEAD
  // Available filters
  const filters = [
    { id: "all", label: "All Blockchains" },
    { id: "bitcoin", label: "Bitcoin Family" },
    { id: "ethereum", label: "Ethereum" },
    { id: "defi", label: "Smart Contracts" },
    { id: "privacy", label: "Privacy Coins" },
=======

  // Available filters
  const filters = [
    { id: "all", label: "All" },
    { id: "bitcoin", label: "Bitcoin ecosystem" },
    { id: "ethereum", label: "Ethereum ecosystem" },
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
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
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient py-8 px-4 md:px-8">      <div className="max-w-7xl mx-auto">
=======
    <div className="min-h-screen bg-gradient py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Blockchain Explorer
          </h1>
          <p className="text-gray-400">
            Real-time data from major cryptocurrency blockchains
<<<<<<< HEAD
          </p>        </header>
=======
          </p>
        </header>
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6

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
<<<<<<< HEAD
        )}        <footer className="mt-12 space-y-6">
          {/* API Status Card */}
          <div className="flex justify-center">
            <APIStatus className="max-w-md" />
          </div>
          
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
=======
        )}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Data provided by Blockchair API • Updated every 30 seconds</p>
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
        </footer>
      </div>
    </div>
  );
};

export default Index;
