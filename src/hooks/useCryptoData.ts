import { useQuery } from '@tanstack/react-query';
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

const filterCryptoData = (data: CryptoData[], filter: string): CryptoData[] => {
  let filteredData = data;
  
  if (filter === 'bitcoin') {
    // Show Bitcoin and Bitcoin-like blockchains
    filteredData = data.filter(crypto => 
      ['bitcoin', 'bitcoin-cash', 'litecoin', 'dogecoin', 'dash', 'zcash', 
       'ecash', 'groestlcoin'].includes(crypto.id)
    );
  } else if (filter === 'ethereum') {
    // Show Ethereum (only Ethereum is available from Blockchair)
    filteredData = data.filter(crypto => 
      ['ethereum'].includes(crypto.id)
    );
  } else if (filter === 'defi') {
    // Show DeFi and smart contract platforms
    filteredData = data.filter(crypto => 
      ['ethereum', 'cardano', 'polkadot', 'kusama'].includes(crypto.id)
    );
  } else if (filter === 'privacy') {
    // Show privacy-focused cryptocurrencies
    filteredData = data.filter(crypto => 
      ['monero', 'zcash', 'dash'].includes(crypto.id)
    );
  } else if (filter === 'all') {
    // Show all available cryptocurrencies - no filtering
    filteredData = data;
  } else {
    // For any other filter, show all
    filteredData = data;
  }
  
  // Sort by market cap (descending) for better display order
  return filteredData.sort((a, b) => {
    // Handle cases where market cap might be undefined
    const aMarketCap = a.marketCap || 0;
    const bMarketCap = b.marketCap || 0;
    if (aMarketCap === bMarketCap) {
      // If market caps are equal, sort by price
      return (b.price || 0) - (a.price || 0);
    }
    return bMarketCap - aMarketCap;
  });
};

const getFallbackData = (filter: string): CryptoData[] => {
  const fallbackData = MOCK_DATA.slice(0, 8); // Show fewer items as fallback
  
  if (filter === 'bitcoin') {
    return fallbackData.filter(crypto => crypto.id === 'bitcoin' || crypto.id === 'bitcoin-cash');
  } else if (filter === 'ethereum') {
    return fallbackData.filter(crypto => 
      crypto.id === 'ethereum' || 
      crypto.id === 'base' || 
      crypto.id === 'beacon' || 
      crypto.id === 'arbitrum'
    );
  }
  
  return fallbackData;
};

export const useCryptoData = (activeFilter: string) => {
  const {
    data: cryptoData = [],
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ['cryptoData', activeFilter],
    queryFn: async () => {
      try {
        console.log(`Fetching crypto data for filter: ${activeFilter}`);
        // Fetch real data from Blockchair API
        const results = await fetchAllCryptoData();
        const parsedData = parseMultipleCryptoData(results);
        
        // Apply filtering based on activeFilter
        const filteredData = filterCryptoData(parsedData, activeFilter);
        
        console.log(`Fetched ${filteredData.length} cryptocurrencies for filter: ${activeFilter}`);
        return filteredData;
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        
        // Return fallback data if API fails
        const fallbackData = getFallbackData(activeFilter);
        console.log(`Using fallback data: ${fallbackData.length} items for filter: ${activeFilter}`);
        return fallbackData;
      }
    },
    // This queryKey will change when activeFilter changes, causing a refetch
    // Data will be cached per filter type
    staleTime: 30 * 60 * 1000, // 30 minutes - data is fresh for 30 min
    gcTime: 60 * 60 * 1000, // 1 hour - keep in cache for 1 hour
    retry: 2,
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchInterval: 30 * 60 * 1000, // Background refetch every 30 minutes
  });

  return { 
    cryptoData, 
    isLoading, 
    error: isError ? (error as Error)?.message || 'Failed to fetch cryptocurrency data. Please try again later.' : null 
  };
};

export default useCryptoData;
