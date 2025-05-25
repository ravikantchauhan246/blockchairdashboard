<<<<<<< HEAD
import { retryWithBackoff, createAPIError, cachedFetch } from '../utils/apiUtils';

const BASE_URL = 'https://api.blockchair.com';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_BLOCKCHAIR_API_KEY;

// Helper function to build URL with API key
const buildAPIUrl = (endpoint: string, additionalParams?: Record<string, string>) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  if (API_KEY) {
    url.searchParams.append('key', API_KEY);
  }
  
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  return url.toString();
};

// Interface for API response structure
interface BlockchairResponse {
  data: Record<string, any>;
  context: {
    code: number;
    cache: any;
    api: any;
    request_cost?: number;
  };
}

// Fetch stats for a single blockchain
export const fetchCryptoData = async (currency: string) => {
  return retryWithBackoff(async () => {
    try {
      const url = buildAPIUrl(`/${currency}/stats`);
      const response = await cachedFetch(url, 30000); // 30 second cache
      if (!response.ok) {
        throw new Error(`Error fetching ${currency} data: ${response.status}`);
      }
      const data: BlockchairResponse = await response.json();
      
      // Log API usage if available
      if (data.context?.request_cost) {
        console.log(`API request cost for ${currency}: ${data.context.request_cost}`);
      }
      
      return data;
    } catch (error) {
      const apiError = createAPIError(error);
      console.error(`Failed to fetch ${currency} data:`, apiError);
      throw error;
    }
  }, 2); // Retry up to 2 times
};

// Fetch stats for multiple blockchains at once (more efficient)
export const fetchAllCryptoData = async () => {
  return retryWithBackoff(async () => {
    try {
      const url = buildAPIUrl('/stats');
      const response = await cachedFetch(url, 60000); // 60 second cache for multiple stats
      if (!response.ok) {
        throw new Error(`Error fetching all crypto data: ${response.status}`);
      }
      const data: BlockchairResponse = await response.json();
      
      // Log API usage if available
      if (data.context?.request_cost) {
        console.log(`API request cost for multiple stats: ${data.context.request_cost}`);
      }
      
      return data;
    } catch (error) {
      const apiError = createAPIError(error);
      console.error('Failed to fetch all crypto data:', apiError);
      throw error;
    }
  }, 2);
};

// Comprehensive list of all supported blockchains from Blockchair API
// This list is based on the actual response from the /stats endpoint
export const SUPPORTED_BLOCKCHAINS = [
  'bitcoin',
  'bitcoin-cash', 
  'cardano',
  'dash',
  'dogecoin',
  'ecash',
  'ethereum',
  'groestlcoin',
  'kusama',
  'litecoin',
  'monero',
  'polkadot',
  'ripple',
  'stellar',
  'zcash'
  // Note: 'cross-chain' is excluded as it's not a specific blockchain
];

// Fetch individual blockchain data for fallback
export const fetchIndividualCryptoData = async () => {
  // Use the most stable and popular blockchains for individual fetching
  const priorityCurrencies = [
    'bitcoin', 'ethereum', 'bitcoin-cash', 'litecoin', 'dogecoin', 'dash',
    'zcash', 'monero', 'cardano', 'polkadot', 'ripple', 'stellar'
  ];
  
  const promises = priorityCurrencies.map(currency => fetchCryptoData(currency));
=======

const BASE_URL = 'https://api.blockchair.com';

export const fetchCryptoData = async (currency: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${currency}/stats`);
    if (!response.ok) {
      throw new Error(`Error fetching ${currency} data`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${currency} data:`, error);
    throw error;
  }
};

export const fetchAllCryptoData = async () => {
  const currencies = ['bitcoin', 'ethereum', 'bitcoin-cash', 'litecoin'];
  const promises = currencies.map(currency => fetchCryptoData(currency));
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
  
  try {
    const results = await Promise.allSettled(promises);
    const successfulResults = results
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value);
    
    return successfulResults;
  } catch (error) {
<<<<<<< HEAD
    console.error('Failed to fetch individual crypto data:', error);
=======
    console.error('Failed to fetch all crypto data:', error);
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
    throw error;
  }
};

// Parse the raw data from the API into a standardized format
export const parseCryptoData = (apiData: any) => {
  if (!apiData || !apiData.data) {
    return null;
  }
  
  const data = apiData.data;
  const currency = Object.keys(data)[0];
  const stats = data[currency];
<<<<<<< HEAD
  // Map from currency names to more user-friendly display names
  // Updated to only include blockchains actually supported by Blockchair API
  const currencyDisplayNames: { [key: string]: string } = {
    'bitcoin': 'Bitcoin',
    'bitcoin-cash': 'Bitcoin Cash',
    'cardano': 'Cardano',
    'dash': 'Dash',
    'dogecoin': 'Dogecoin',
    'ecash': 'eCash',
    'ethereum': 'Ethereum',
    'groestlcoin': 'Groestlcoin',
    'kusama': 'Kusama',
    'litecoin': 'Litecoin',
    'monero': 'Monero',
    'polkadot': 'Polkadot',
    'ripple': 'XRP Ledger',
    'stellar': 'Stellar',
    'zcash': 'Zcash'
=======
  
  // Map from currency names to more user-friendly display names
  const currencyDisplayNames: { [key: string]: string } = {
    'bitcoin': 'Bitcoin',
    'ethereum': 'Ethereum',
    'bitcoin-cash': 'Bitcoin Cash',
    'litecoin': 'Litecoin',
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
  };
  
  // Map from currency names to their symbols
  const currencySymbols: { [key: string]: string } = {
    'bitcoin': 'BTC',
<<<<<<< HEAD
    'bitcoin-cash': 'BCH',
    'cardano': 'ADA',
    'dash': 'DASH',
    'dogecoin': 'DOGE',
    'ecash': 'XEC',
    'ethereum': 'ETH',
    'groestlcoin': 'GRS',
    'kusama': 'KSM',
    'litecoin': 'LTC',
    'monero': 'XMR',
    'polkadot': 'DOT',
    'ripple': 'XRP',
    'stellar': 'XLM',
    'zcash': 'ZEC'
  };  // Handle different blockchain types with more sophisticated logic
  let blockNumber = 0;
  let blockTime = new Date();
  let fee = 0;
  let blockLabel = 'Latest block';

  // Handle Bitcoin-like chains
  if (stats.blocks !== undefined) {
    blockNumber = stats.blocks;
    blockTime = new Date(stats.best_block_time + ' UTC');
    fee = stats.average_transaction_fee_usd_24h || stats.suggested_transaction_fee_usd || 0;
    blockLabel = 'Latest block';
  }
  // Handle Ethereum-like chains
  else if (stats.best_block_height !== undefined) {
    blockNumber = stats.best_block_height;
    blockTime = new Date(stats.best_block_time + ' UTC');
    fee = stats.average_transaction_fee_usd_24h || 0;
    blockLabel = 'Latest block';
  }
  // Handle Ripple/Stellar-like chains (ledgers)
  else if (stats.ledgers !== undefined) {
    blockNumber = stats.ledgers;
    blockTime = new Date(stats.best_ledger_time + ' UTC');
    fee = stats.average_transaction_fee_usd_24h || 0;
    blockLabel = 'Latest ledger';
  }
  // Handle Cardano (epochs)
  else if (currency === 'cardano' && stats.epoch !== undefined) {
    blockNumber = stats.epoch;
    blockTime = new Date(stats.best_epoch_time || Date.now());
    fee = stats.average_transaction_fee_usd_24h || 0;
    blockLabel = 'Latest epoch';
  }
  // Fallback for any other blockchain types
  else {
    blockNumber = stats.height || stats.block_height || 0;
    blockTime = new Date(stats.time || stats.block_time || Date.now());
    fee = stats.average_transaction_fee_usd_24h || 0;
    blockLabel = 'Latest block';
  }
    return {
    id: currency,
    name: currencyDisplayNames[currency] || currency,
    symbol: currencySymbols[currency] || currency.toUpperCase(),
    price: stats.market_price_usd || 0,
    blockNumber: blockNumber,
    blockTime: blockTime,
    blockLabel: blockLabel,
    fee: fee,
    marketCap: stats.market_cap_usd || 0,
    dominance: stats.market_dominance_percentage || 0,
    change24h: stats.market_price_usd_change_24h_percentage || 0,
    volume24h: stats.volume_24h || 0,
    transactions24h: stats.transactions_24h || 0,
  };
};

// Parse multiple blockchain data from the /stats endpoint
export const parseMultipleCryptoData = (apiData: BlockchairResponse) => {
  if (!apiData || !apiData.data) {
    return [];
  }
  
  const results = [];
  const data = apiData.data;
  
  // Process each blockchain
  for (const [currency, blockchainData] of Object.entries(data)) {
    if (currency === 'cross-chain' || !blockchainData || typeof blockchainData !== 'object') {
      continue;
    }
    
    const stats = (blockchainData as any).data || blockchainData;
    
    // Skip if no data available
    if (!stats || typeof stats !== 'object') {
      continue;
    }
    
    const currencyDisplayNames: { [key: string]: string } = {
      'bitcoin': 'Bitcoin',
      'ethereum': 'Ethereum',
      'bitcoin-cash': 'Bitcoin Cash',
      'litecoin': 'Litecoin',
      'dogecoin': 'Dogecoin',
      'dash': 'Dash',
      'ripple': 'XRP',
      'stellar': 'Stellar',
      'monero': 'Monero',
      'cardano': 'Cardano',
      'zcash': 'Zcash',
      'ecash': 'eCash',
      'groestlcoin': 'Groestlcoin',
      'polkadot': 'Polkadot',
      'kusama': 'Kusama',
    };
    
    const currencySymbols: { [key: string]: string } = {
      'bitcoin': 'BTC',
      'ethereum': 'ETH',
      'bitcoin-cash': 'BCH',
      'litecoin': 'LTC',
      'dogecoin': 'DOGE',
      'dash': 'DASH',
      'ripple': 'XRP',
      'stellar': 'XLM',
      'monero': 'XMR',
      'cardano': 'ADA',
      'zcash': 'ZEC',
      'ecash': 'XEC',
      'groestlcoin': 'GRS',
      'polkadot': 'DOT',
      'kusama': 'KSM',
    };

    // Handle different blockchain types
    let blockNumber = 0;
    let blockTime = new Date();
    let fee = 0;

    // Handle Bitcoin-like chains
    if (stats.blocks !== undefined) {
      blockNumber = stats.blocks;
      blockTime = new Date(stats.best_block_time + ' UTC');
      fee = stats.average_transaction_fee_usd_24h || stats.suggested_transaction_fee_usd || 0;
    }
    // Handle Ethereum-like chains
    else if (stats.best_block_height !== undefined) {
      blockNumber = stats.best_block_height;
      blockTime = new Date(stats.best_block_time + ' UTC');
      fee = stats.average_transaction_fee_usd_24h || 0;
    }
    // Handle Ripple/Stellar-like chains (ledgers)
    else if (stats.ledgers !== undefined) {
      blockNumber = stats.ledgers;
      blockTime = new Date(stats.best_ledger_time + ' UTC');
      fee = stats.average_transaction_fee_usd_24h || 0;
    }
    // Handle other chains
    else if (stats.best_block_height !== undefined) {
      blockNumber = stats.best_block_height;
      blockTime = new Date(stats.best_block_time + ' UTC');
      fee = 0;
    }

    const parsedData = {
      id: currency,
      name: currencyDisplayNames[currency] || currency,
      symbol: currencySymbols[currency] || currency.toUpperCase(),
      price: stats.market_price_usd || 0,
      blockNumber: blockNumber,
      blockTime: blockTime,
      fee: fee,
      marketCap: stats.market_cap_usd || 0,
      dominance: stats.market_dominance_percentage || 0,
      change24h: stats.market_price_usd_change_24h_percentage || 0,
      volume24h: stats.volume_24h || 0,
      transactions24h: stats.transactions_24h || 0,
    };

    results.push(parsedData);
  }
  
  return results;
};

// Fetch dashboard data for a specific blockchain
export const fetchDashboardData = async (blockchain: string, entity: string, identifier: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${blockchain}/dashboards/${entity}/${identifier}`);
    if (!response.ok) {
      throw new Error(`Error fetching ${blockchain} ${entity} data: ${response.status}`);
    }
    const data: BlockchairResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${blockchain} ${entity} data:`, error);
    throw error;
  }
};

// Fetch recent blocks for a blockchain
export const fetchRecentBlocks = async (blockchain: string, limit: number = 10) => {
  return retryWithBackoff(async () => {
    try {
      const url = buildAPIUrl(`/${blockchain}/blocks`, { 
        limit: limit.toString(),
        offset: '0'
      });
      const response = await cachedFetch(url, 30000);
      if (!response.ok) {
        throw new Error(`Error fetching recent blocks for ${blockchain}: ${response.status}`);
      }
      const data: BlockchairResponse = await response.json();
      
      if (data.context?.request_cost) {
        console.log(`API request cost for ${blockchain} blocks: ${data.context.request_cost}`);
      }
      
      return data;
    } catch (error) {
      const apiError = createAPIError(error);
      console.error(`Failed to fetch recent blocks for ${blockchain}:`, apiError);
      throw error;
    }
  }, 2);
};

// Fetch recent transactions for a blockchain
export const fetchRecentTransactions = async (blockchain: string, limit: number = 10) => {
  return retryWithBackoff(async () => {
    try {
      const url = buildAPIUrl(`/${blockchain}/transactions`, { 
        limit: limit.toString(),
        offset: '0'
      });
      const response = await cachedFetch(url, 30000);
      if (!response.ok) {
        throw new Error(`Error fetching recent transactions for ${blockchain}: ${response.status}`);
      }
      const data: BlockchairResponse = await response.json();
      
      if (data.context?.request_cost) {
        console.log(`API request cost for ${blockchain} transactions: ${data.context.request_cost}`);
      }
      
      return data;
    } catch (error) {
      const apiError = createAPIError(error);
      console.error(`Failed to fetch recent transactions for ${blockchain}:`, apiError);
      throw error;
    }
  }, 2);
};

// Fetch address information
export const fetchAddressInfo = async (blockchain: string, address: string) => {
  return retryWithBackoff(async () => {
    try {
      const url = buildAPIUrl(`/${blockchain}/dashboards/address/${address}`);
      const response = await cachedFetch(url, 60000);
      if (!response.ok) {
        throw new Error(`Error fetching address info for ${address}: ${response.status}`);
      }
      const data: BlockchairResponse = await response.json();
      
      if (data.context?.request_cost) {
        console.log(`API request cost for address ${address}: ${data.context.request_cost}`);
      }
      
      return data;
    } catch (error) {
      const apiError = createAPIError(error);
      console.error(`Failed to fetch address info for ${address}:`, apiError);
      throw error;
    }
  }, 2);
};

// Fetch transaction details
export const fetchTransactionDetails = async (blockchain: string, txHash: string) => {
  return retryWithBackoff(async () => {
    try {
      const url = buildAPIUrl(`/${blockchain}/dashboards/transaction/${txHash}`);
      const response = await cachedFetch(url, 60000);
      if (!response.ok) {
        throw new Error(`Error fetching transaction details for ${txHash}: ${response.status}`);
      }
      const data: BlockchairResponse = await response.json();
      
      if (data.context?.request_cost) {
        console.log(`API request cost for transaction ${txHash}: ${data.context.request_cost}`);
      }
      
      return data;
    } catch (error) {
      const apiError = createAPIError(error);
      console.error(`Failed to fetch transaction details for ${txHash}:`, apiError);
      throw error;
    }
  }, 2);
};

// Fetch premium API usage stats (requires API key)
export const fetchAPIUsageStats = async () => {
  if (!API_KEY) {
    throw new Error('API key is required to fetch usage stats');
  }
  
  return retryWithBackoff(async () => {
    try {
      // Note: The premium stats endpoint might not be available for all API keys
      // This is a placeholder - the actual endpoint may vary based on your API plan
      const url = buildAPIUrl('/premium/stats');
      const response = await cachedFetch(url, 300000); // 5 minute cache
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Premium stats not available for this API key');
        }
        throw new Error(`Error fetching API usage stats: ${response.status}`);
      }
      const data: BlockchairResponse = await response.json();
      
      return data;
    } catch (error) {
      const apiError = createAPIError(error);
      console.error('Failed to fetch API usage stats:', apiError);
      throw error;
    }
  }, 2);
};
=======
    'ethereum': 'ETH',
    'bitcoin-cash': 'BCH',
    'litecoin': 'LTC',
  };
  
  return {
    id: currency,
    name: currencyDisplayNames[currency] || currency,
    symbol: currencySymbols[currency] || currency.toUpperCase(),
    price: stats.market_price_usd,
    blockNumber: stats.blocks,
    blockTime: new Date(stats.best_block_time * 1000), // Convert Unix timestamp to Date
    fee: stats.average_transaction_fee_usd || stats.suggested_transaction_fee_usd || 0,
  };
};
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
