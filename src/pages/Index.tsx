
import { useState } from "react";
import FilterTabs from "@/components/FilterTabs";
import CryptoGrid from "@/components/CryptoGrid";
import useCryptoData from "@/hooks/useCryptoData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { cryptoData, isLoading, error } = useCryptoData(activeFilter);
  const { toast } = useToast();

  // Available filters
  const filters = [
    { id: "all", label: "All" },
    { id: "bitcoin", label: "Bitcoin ecosystem" },
    { id: "ethereum", label: "Ethereum ecosystem" },
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
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Blockchain Explorer
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
        )}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Data provided by Blockchair API • Updated every 30 seconds</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
