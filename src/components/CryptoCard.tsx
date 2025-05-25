
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  blockNumber: number;
  blockTime: Date;
  fee: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  price,
  blockNumber,
  blockTime,
  fee,
}) => {
  // Convert the block time to a human-readable format
  const timeAgo = formatDistanceToNow(blockTime, { addSuffix: true });
  
  // Format the price with commas
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fee < 0.01 ? 5 : 2,
    maximumFractionDigits: fee < 0.01 ? 5 : 2,
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
  
  // Determine which gradient to use based on the cryptocurrency name
  const gradientClass = `bg-gradients-${name.toLowerCase().replace(/\s+/g, '-')}`;
  const iconClass = `text-crypto-${name.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`crypto-card rounded-2xl p-6 ${gradientClass} text-white`}>
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
        </div>
        
        <div>
          <p className="text-gray-400">Average fee</p>
          <p className="font-medium">{formattedFee}</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
