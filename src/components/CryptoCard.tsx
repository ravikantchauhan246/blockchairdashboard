
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BorderBeam } from "@/components/magicui/border-beam";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  blockNumber: number;
  blockTime: Date;
  blockLabel?: string;
  fee: number;
  marketCap?: number;
  change24h?: number;
  transactions24h?: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  price,
  blockNumber,
  blockTime,
  blockLabel = 'Latest block',
  fee,
  marketCap,
  change24h,
  transactions24h,
}) => {
  // Convert the block time to a human-readable format
  const timeAgo = formatDistanceToNow(blockTime, { addSuffix: true });
  
  // Format the price with appropriate decimals
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: price < 0.01 ? 5 : price < 1 ? 4 : 2,
    maximumFractionDigits: price < 0.01 ? 5 : price < 1 ? 4 : 2,
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
    // Determine which gradient to use based on the cryptocurrency name
  const gradientClass = `bg-gradients-${name.toLowerCase().replace(/\s+/g, '-')}`;
  const iconClass = `text-crypto-${name.toLowerCase().replace(/\s+/g, '-')}`;
    // Define border beam colors based on cryptocurrency
  const getBorderBeamColors = (cryptoName: string) => {
    const colorMap: { [key: string]: { primary: string; secondary: string } } = {
      'bitcoin': { primary: '#f97316', secondary: '#eab308' }, // orange-500, yellow-500
      'ethereum': { primary: '#3b82f6', secondary: '#8b5cf6' }, // blue-500, purple-500
      'bitcoin cash': { primary: '#10b981', secondary: '#059669' }, // green-500, emerald-600
      'litecoin': { primary: '#9ca3af', secondary: '#60a5fa' }, // gray-400, blue-400
      'dogecoin': { primary: '#eab308', secondary: '#f97316' }, // yellow-500, orange-500
      'cardano': { primary: '#2563eb', secondary: '#6366f1' }, // blue-600, indigo-500
      'polkadot': { primary: '#ec4899', secondary: '#ef4444' }, // pink-500, red-500
      'ripple': { primary: '#60a5fa', secondary: '#06b6d4' }, // blue-400, cyan-500
      'xrp ledger': { primary: '#60a5fa', secondary: '#06b6d4' }, // blue-400, cyan-500
      'stellar': { primary: '#3b82f6', secondary: '#14b8a6' }, // blue-500, teal-500
      'monero': { primary: '#ea580c', secondary: '#dc2626' }, // orange-600, red-600
      'dash': { primary: '#1d4ed8', secondary: '#4338ca' }, // blue-700, indigo-700
      'zcash': { primary: '#ca8a04', secondary: '#ea580c' }, // yellow-600, orange-600
    };
    
    const colors = colorMap[cryptoName.toLowerCase()] || { primary: '#6b7280', secondary: '#9ca3af' }; // gray-500, gray-400
    return colors;
  };
  const borderColors = getBorderBeamColors(name);
    return (
    <CardContainer className="inter-var w-full" containerClassName="py-1">
      <CardBody className={`crypto-card relative group/card rounded-xl p-4 ${gradientClass} text-white overflow-hidden border border-white/[0.1] hover:shadow-2xl hover:shadow-emerald-500/[0.1] w-full h-full`}>        <CardItem translateZ="80" rotateX={5} rotateY={5} className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <CardItem translateZ="95" className={`w-8 h-8 rounded-full flex items-center justify-center ${iconClass} bg-opacity-20 mr-2`}>
              {/* This is where you would put the icon, for now using the first letter */}
              <span className="text-lg font-bold">{symbol.charAt(0)}</span>
            </CardItem>
            <div>
              <CardItem translateZ="80" as="h3" className="text-lg font-bold">{name}</CardItem>
              <CardItem translateZ="80" as="p" className="text-gray-300 text-sm">{symbol}</CardItem>
            </div>
          </div>
          <div className="text-right">
            <CardItem translateZ="90" as="p" className="text-base font-bold">{formattedPrice}</CardItem>
            <CardItem translateZ="50" as="p" className={`text-xs ${changeColor}`}>{formattedChange24h}</CardItem>
          </div>
        </CardItem>
        
        <CardItem translateZ="10" className="grid grid-cols-2 gap-3 text-xs">
          <CardItem translateZ="30" className="space-y-1">
            <p className="text-gray-400">{blockLabel}</p>
            <p className="font-medium text-sm">{formattedBlockNumber}</p>
            <p className="text-xs text-gray-300">{timeAgo}</p>
          </CardItem>
          
          <CardItem translateZ="30" className="space-y-1">
            <p className="text-gray-400">Average fee</p>
            <p className="font-medium text-sm">{formattedFee}</p>
          </CardItem>
          
          <CardItem translateZ="30" className="space-y-1">
            <p className="text-gray-400">Market cap</p>
            <p className="font-medium text-sm">{formattedMarketCap}</p>
          </CardItem>
          
          <CardItem translateZ="30" className="space-y-1">
            <p className="text-gray-400">24h transactions</p>
            <p className="font-medium text-sm">{formattedTransactions24h}</p>
          </CardItem>
        </CardItem>
        
        {/* Animated border beams with cryptocurrency-specific colors */}
        <BorderBeam
          duration={5}
          size={100}
          colorFrom={borderColors.primary}
          colorTo={borderColors.secondary}
        />
      </CardBody>
    </CardContainer>
  );
};

export default CryptoCard;
