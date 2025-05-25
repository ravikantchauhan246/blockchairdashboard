import { useState, useEffect } from 'react';
import { fetchAllCryptoData, parseMultipleCryptoData } from '../services/blockchairApi';

interface CryptoData {
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

const MOCK_DATA: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 105286,
    blockNumber: 897579,
    blockTime: new Date(Date.now() - 17 * 60 * 1000), // 17 minutes ago
    fee: 1.29,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2481,
    blockNumber: 22524893,
    blockTime: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    fee: 0.73,
  },
  {
    id: 'aptos',
    name: 'Aptos',
    symbol: 'APT',
    price: 5.08,
    blockNumber: 346678840,
    blockTime: new Date(Date.now() - 2 * 1000), // 2 seconds ago
    fee: 0.00063,
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum One',
    symbol: 'ARB',
    price: 0.38,
    blockNumber: 338706953,
    blockTime: new Date(Date.now() - 1 * 1000), // 1 second ago
    fee: 0.0066,
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 22.13,
    blockNumber: 62395514,
    blockTime: new Date(Date.now() - 4 * 1000), // 4 seconds ago
    fee: 0.015,
  },
  {
    id: 'base',
    name: 'Base',
    symbol: 'ETH',
    price: 2481,
    blockNumber: 30483945,
    blockTime: new Date(Date.now() - 5 * 1000), // 5 seconds ago
    fee: 0.018,
  },
  {
    id: 'beacon',
    name: 'Beacon Chain',
    symbol: 'ETH',
    price: 2481,
    blockNumber: 367001,
    blockTime: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    fee: 0,
  },
  {
    id: 'bitcoin-cash',
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    price: 386.70,
    blockNumber: 899092,
    blockTime: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    fee: 0.0087,
  },
];

export const useCryptoData = (activeFilter: string) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
        try {
        // Fetch real data from Blockchair API
        const results = await fetchAllCryptoData();
        const parsedData = parseMultipleCryptoData(results);
        
        // Apply filtering based on activeFilter
        let filteredData = parsedData;
          if (activeFilter === 'bitcoin') {
          // Show Bitcoin and Bitcoin-like blockchains
          filteredData = parsedData.filter(crypto => 
            ['bitcoin', 'bitcoin-cash', 'litecoin', 'dogecoin', 'dash', 'zcash', 
             'ecash', 'groestlcoin'].includes(crypto.id)
          );
        } else if (activeFilter === 'ethereum') {
          // Show Ethereum (only Ethereum is available from Blockchair)
          filteredData = parsedData.filter(crypto => 
            ['ethereum'].includes(crypto.id)
          );
        } else if (activeFilter === 'defi') {
          // Show DeFi and smart contract platforms
          filteredData = parsedData.filter(crypto => 
            ['ethereum', 'cardano', 'polkadot', 'kusama'].includes(crypto.id)
          );
        } else if (activeFilter === 'privacy') {
          // Show privacy-focused cryptocurrencies
          filteredData = parsedData.filter(crypto => 
            ['monero', 'zcash', 'dash'].includes(crypto.id)
          );
        } else if (activeFilter === 'all') {
          // Show all available cryptocurrencies - no filtering
          filteredData = parsedData;
        } else {
          // For any other filter, show all
          filteredData = parsedData;
        }
        
        // Sort by market cap (descending) for better display order
        filteredData.sort((a, b) => {
          // Handle cases where market cap might be undefined
          const aMarketCap = a.marketCap || 0;
          const bMarketCap = b.marketCap || 0;
          if (aMarketCap === bMarketCap) {
            // If market caps are equal, sort by price
            return (b.price || 0) - (a.price || 0);
          }
          return bMarketCap - aMarketCap;
        });
        
        console.log(`Fetched ${filteredData.length} cryptocurrencies for filter: ${activeFilter}`);
        setCryptoData(filteredData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        setIsLoading(false);
        
        // Fallback to a subset of mock data if API fails
        const fallbackData = MOCK_DATA.slice(0, 8); // Show fewer items as fallback
        
        let filteredFallback = fallbackData;
        if (activeFilter === 'bitcoin') {
          filteredFallback = fallbackData.filter(crypto => crypto.id === 'bitcoin' || crypto.id === 'bitcoin-cash');
        } else if (activeFilter === 'ethereum') {
          filteredFallback = fallbackData.filter(crypto => 
            crypto.id === 'ethereum' || 
            crypto.id === 'base' || 
            crypto.id === 'beacon' || 
            crypto.id === 'arbitrum'
          );
        }
        
        setCryptoData(filteredFallback);
      }
    };
    
    fetchData();
    
    // Set up a refresh interval (every 30mins seconds for real API data)
    const intervalId = setInterval(fetchData, 1800000);
    
    return () => clearInterval(intervalId);
  }, [activeFilter]);
  
  return { cryptoData, isLoading, error };
};

export default useCryptoData;
