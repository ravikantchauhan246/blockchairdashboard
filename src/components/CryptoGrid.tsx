import React from 'react';
import CryptoCard from './CryptoCard';
import { Skeleton } from "@/components/ui/skeleton";

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  blockNumber: number;
  blockTime: Date;
  blockLabel?: string;
  fee: number;
  marketCap?: number;
  dominance?: number;
  change24h?: number;
  volume24h?: number;
  transactions24h?: number;
}

interface CryptoGridProps {
  cryptocurrencies: Cryptocurrency[];
  isLoading: boolean;
}

const CryptoGrid: React.FC<CryptoGridProps> = ({ cryptocurrencies, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {isLoading ? (
        // Render loading skeletons
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="crypto-card rounded-2xl p-6 bg-gray-800/50">
            <div className="flex items-center mb-4">
              <Skeleton className="w-10 h-10 rounded-full mr-3" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))
      ) : (
        cryptocurrencies.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            name={crypto.name}
            symbol={crypto.symbol}
            price={crypto.price}
            blockNumber={crypto.blockNumber}
            blockTime={crypto.blockTime}
            blockLabel={crypto.blockLabel}
            fee={crypto.fee}
            marketCap={crypto.marketCap}
            change24h={crypto.change24h}
            transactions24h={crypto.transactions24h}
          />
        ))
      )}
    </div>
  );
};

export default CryptoGrid;
