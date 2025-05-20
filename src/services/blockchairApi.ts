
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
  
  try {
    const results = await Promise.allSettled(promises);
    const successfulResults = results
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value);
    
    return successfulResults;
  } catch (error) {
    console.error('Failed to fetch all crypto data:', error);
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
  
  // Map from currency names to more user-friendly display names
  const currencyDisplayNames: { [key: string]: string } = {
    'bitcoin': 'Bitcoin',
    'ethereum': 'Ethereum',
    'bitcoin-cash': 'Bitcoin Cash',
    'litecoin': 'Litecoin',
  };
  
  // Map from currency names to their symbols
  const currencySymbols: { [key: string]: string } = {
    'bitcoin': 'BTC',
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
