
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  blockNumber: number;
  blockTime: Date;
<<<<<<< HEAD
  blockLabel?: string;
  fee: number;
  marketCap?: number;
  change24h?: number;
  transactions24h?: number;
=======
  fee: number;
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  price,
  blockNumber,
  blockTime,
<<<<<<< HEAD
  blockLabel = 'Latest block',
  fee,
  marketCap,
  change24h,
  transactions24h,
=======
  fee,
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
}) => {
  // Convert the block time to a human-readable format
  const timeAgo = formatDistanceToNow(blockTime, { addSuffix: true });
  
<<<<<<< HEAD
  // Format the price with appropriate decimals
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: price < 0.01 ? 5 : price < 1 ? 4 : 2,
    maximumFractionDigits: price < 0.01 ? 5 : price < 1 ? 4 : 2,
=======
  // Format the price with commas
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fee < 0.01 ? 5 : 2,
    maximumFractionDigits: fee < 0.01 ? 5 : 2,
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
  }).format(price);
  
  // Format the fee with appropriate decimals
  const formattedFee = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fee < 0.01 ? 5 : 2,
    maximumFractionDigits: fee < 0.01 ? 5 : 2,
  }).format(fee);
  
  // Format the block number with commas
  const formattedBlockNumber = new Intl.NumberFormat('en-US').format(blockNumber);
  
<<<<<<< HEAD
  // Format market cap
  const formattedMarketCap = marketCap ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(marketCap) : 'N/A';
  
  // Format 24h change
  const formattedChange24h = change24h !== undefined ? `${change24h > 0 ? '+' : ''}${change24h.toFixed(2)}%` : 'N/A';
  const changeColor = change24h !== undefined ? (change24h >= 0 ? 'text-green-400' : 'text-red-400') : 'text-gray-400';
  
  // Format transactions 24h
  const formattedTransactions24h = transactions24h ? new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(transactions24h) : 'N/A';
  
=======
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
  // Determine which gradient to use based on the cryptocurrency name
  const gradientClass = `bg-gradients-${name.toLowerCase().replace(/\s+/g, '-')}`;
  const iconClass = `text-crypto-${name.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`crypto-card rounded-2xl p-6 ${gradientClass} text-white`}>
<<<<<<< HEAD
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconClass} bg-opacity-20 mr-3`}>
            {/* This is where you would put the icon, for now using the first letter */}
            <span className="text-xl font-bold">{symbol.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-300">{symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">{formattedPrice}</p>
          <p className={`text-sm ${changeColor}`}>{formattedChange24h}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">        <div>
          <p className="text-gray-400">{blockLabel}</p>
          <p className="font-medium">{formattedBlockNumber}</p>
          <p className="text-xs text-gray-300">{timeAgo}</p>
=======
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconClass} bg-opacity-20 mr-3`}>
          {/* This is where you would put the icon, for now using the first letter */}
          <span className="text-xl font-bold">{symbol.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-300">{formattedPrice} {symbol}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div>
          <p className="text-gray-400">Latest block</p>
          <p className="font-medium">{formattedBlockNumber} · {timeAgo}</p>
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
        </div>
        
        <div>
          <p className="text-gray-400">Average fee</p>
          <p className="font-medium">{formattedFee}</p>
        </div>
<<<<<<< HEAD
        
        <div>
          <p className="text-gray-400">Market cap</p>
          <p className="font-medium">{formattedMarketCap}</p>
        </div>
        
        <div>
          <p className="text-gray-400">24h transactions</p>
          <p className="font-medium">{formattedTransactions24h}</p>
        </div>
=======
>>>>>>> 071fe3259dace8ee73ba64b0c48435bf2271b5b6
      </div>
    </div>
  );
};

export default CryptoCard;
