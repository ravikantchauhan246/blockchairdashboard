import React from 'react';

interface CryptoIconProps {
  name: string;
  symbol: string;
  size?: number;
  className?: string;
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ name, symbol, size = 32, className = "" }) => {
  // Map cryptocurrency names/symbols to their icon URLs from CoinGecko
  const getIconUrl = () => {
    const normalizedName = name.toLowerCase();
    const normalizedSymbol = symbol.toLowerCase();
    
    // Map to CoinGecko icon URLs
    const iconMap: { [key: string]: string } = {
      'bitcoin': 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
      'ethereum': 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      'bitcoin cash': 'https://assets.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png',
      'litecoin': 'https://assets.coingecko.com/coins/images/2/small/litecoin.png',
      'dogecoin': 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
      'cardano': 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
      'polkadot': 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
      'ripple': 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
      'xrp ledger': 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
      'stellar': 'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png',
      'monero': 'https://assets.coingecko.com/coins/images/69/small/monero_logo.png',
      'dash': 'https://assets.coingecko.com/coins/images/19/small/dash-logo.png',
      'zcash': 'https://assets.coingecko.com/coins/images/486/small/circle-zcash-color.png',
      'ecash': 'https://assets.coingecko.com/coins/images/16646/small/Logo_final-22.png',
      'groestlcoin': 'https://assets.coingecko.com/coins/images/419/small/groestlcoin.png',
      'kusama': 'https://assets.coingecko.com/coins/images/9568/small/m4zRhP5e_400x400.jpg'
    };
    
    // Try to find by name first, then by symbol
    let iconUrl = iconMap[normalizedName];
    
    if (!iconUrl) {
      // Try matching by symbol
      const symbolMappings: { [key: string]: string } = {
        'btc': 'bitcoin',
        'eth': 'ethereum',
        'bch': 'bitcoin cash',
        'ltc': 'litecoin',
        'doge': 'dogecoin',
        'ada': 'cardano',
        'dot': 'polkadot',
        'xrp': 'ripple',
        'xlm': 'stellar',
        'xmr': 'monero',
        'dash': 'dash',
        'zec': 'zcash',
        'xec': 'ecash',
        'grs': 'groestlcoin',
        'ksm': 'kusama'
      };
      
      const mappedName = symbolMappings[normalizedSymbol];
      if (mappedName) {
        iconUrl = iconMap[mappedName];
      }
    }
    
    return iconUrl;
  };

  const iconUrl = getIconUrl();
  
  if (iconUrl) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img 
          src={iconUrl} 
          alt={`${name} logo`}
          width={size} 
          height={size}
          className="rounded-full"
          onError={(e) => {
            // Fallback to letter if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) {
              fallback.style.display = 'flex';
            }
          }}
        />
        {/* Fallback div - hidden by default, shown if image fails */}
        <div 
          className="rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold"
          style={{ 
            width: size, 
            height: size, 
            fontSize: size * 0.4,
            display: 'none'
          }}
        >
          {symbol.charAt(0).toUpperCase()}
        </div>
      </div>
    );
  }
  
  // Fallback: return a styled circle with the first letter of the symbol
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {symbol.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};

export default CryptoIcon;
