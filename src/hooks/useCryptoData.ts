
import { useState, useEffect } from 'react';
import { fetchAllCryptoData, parseCryptoData } from '../services/blockchairApi';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  blockNumber: number;
  blockTime: Date;
  fee: number;
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
        // For now, we'll use mock data to match the design
        // In a production app, we would use the API data
        // const results = await fetchAllCryptoData();
        // const parsedData = results.map(parseCryptoData).filter(Boolean);
        // setCryptoData(parsedData);
        
        // Using mock data for demo purposes
        setTimeout(() => {
          // Filter the mock data based on activeFilter
          let filteredData = MOCK_DATA;
          if (activeFilter === 'bitcoin') {
            filteredData = MOCK_DATA.filter(crypto => crypto.id === 'bitcoin' || crypto.id === 'bitcoin-cash');
          } else if (activeFilter === 'ethereum') {
            filteredData = MOCK_DATA.filter(crypto => 
              crypto.id === 'ethereum' || 
              crypto.id === 'base' || 
              crypto.id === 'beacon' || 
              crypto.id === 'arbitrum'
            );
          }
          
          setCryptoData(filteredData);
          setIsLoading(false);
        }, 1000); // Simulate API delay
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Set up a refresh interval (every 30 seconds)
    const intervalId = setInterval(fetchData, 30000);
    
    return () => clearInterval(intervalId);
  }, [activeFilter]);
  
  return { cryptoData, isLoading, error };
};

export default useCryptoData;
