import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptoData } from '@/services/blockchairApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, TrendingUp, Clock, Hash, DollarSign, Users, Activity, Zap, Globe, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import CryptoIcon from '@/components/CryptoIcon';
import { scrollToTop } from '@/utils/scrollUtils';

// Map blockchain identifiers to display names
const blockchainDisplayNames: { [key: string]: string } = {
  'bitcoin': 'Bitcoin',
  'bitcoin-cash': 'Bitcoin Cash',
  'ethereum': 'Ethereum',
  'litecoin': 'Litecoin',
  'dogecoin': 'Dogecoin',
  'cardano': 'Cardano',
  'polkadot': 'Polkadot',
  'ripple': 'Ripple',
  'stellar': 'Stellar',
  'monero': 'Monero',
  'dash': 'Dash',
  'zcash': 'Zcash',
  'ecash': 'eCash',
  'groestlcoin': 'Groestlcoin',
  'kusama': 'Kusama'
};

// Map blockchain identifiers to symbols
const blockchainSymbols: { [key: string]: string } = {
  'bitcoin': 'BTC',
  'bitcoin-cash': 'BCH',
  'ethereum': 'ETH',
  'litecoin': 'LTC',
  'dogecoin': 'DOGE',
  'cardano': 'ADA',
  'polkadot': 'DOT',
  'ripple': 'XRP',
  'stellar': 'XLM',
  'monero': 'XMR',
  'dash': 'DASH',
  'zcash': 'ZEC',
  'ecash': 'XEC',
  'groestlcoin': 'GRS',
  'kusama': 'KSM'
};

const BlockchainStats: React.FC = () => {
  const { blockchain } = useParams<{ blockchain: string }>();
  const navigate = useNavigate();
  // Scroll to top when component mounts or blockchain changes
  useEffect(() => {
    // Use instant scroll for initial load, smooth for navigation
    scrollToTop('auto');
    // Small delay for smooth scroll to ensure page is rendered
    const timer = setTimeout(() => {
      scrollToTop('smooth');
    }, 50);
    
    return () => clearTimeout(timer);
  }, [blockchain]);
  
  if (!blockchain || !blockchainDisplayNames[blockchain]) {
    return <Navigate to="/404" replace />;
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['blockchain-stats', blockchain],
    queryFn: () => fetchCryptoData(blockchain),
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="border-red-500/20 bg-red-500/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
              <p className="text-gray-400">Failed to fetch {blockchainDisplayNames[blockchain]} statistics. Please try again later.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const stats = data?.data;
  const displayName = blockchainDisplayNames[blockchain];
  const symbol = blockchainSymbols[blockchain];

  // Generate mock data for the chart (in a real app, you'd fetch historical data)
  const generateMockChartData = () => {
    const data = [];
    const basePrice = stats?.market_price_usd || 50000;
    for (let i = 23; i >= 0; i--) {
      data.push({
        time: `${i}h ago`,
        price: basePrice + (Math.random() - 0.5) * basePrice * 0.1,
        volume: Math.random() * 1000000000,
      });
    }
    return data;
  };

  const chartData = generateMockChartData();

  const formatNumber = (num: number, notation: 'compact' | 'standard' = 'standard') => {
    return new Intl.NumberFormat('en-US', {
      notation,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatCurrency = (num: number, notation: 'compact' | 'standard' = 'standard') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPercentage = (num: number) => {
    const isPositive = num >= 0;
    return (
      <span className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
        {Math.abs(num).toFixed(2)}%
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-8 w-32 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="self-start sm:mr-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>            <div className="flex items-center space-x-4">
              <CryptoIcon 
                name={displayName} 
                symbol={symbol} 
                size={48} 
                className="flex-shrink-0"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                  {displayName} <span className="text-muted-foreground">({symbol})</span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">Real-time blockchain statistics and analytics</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="self-start sm:self-auto px-3 py-1">
            Live Data
          </Badge>
        </div>        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Price */}
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-blue-400">Current Price</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-xl sm:text-2xl font-bold text-blue-300 break-words">
                {stats?.market_price_usd ? formatCurrency(stats.market_price_usd) : 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stats?.market_price_usd_change_24h_percentage !== undefined 
                  ? formatPercentage(stats.market_price_usd_change_24h_percentage)
                  : 'N/A'
                }
              </div>
            </CardContent>
          </Card>

          {/* Market Cap */}
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-green-400">Market Cap</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-xl sm:text-2xl font-bold text-green-300 break-words">
                {stats?.market_cap_usd ? formatCurrency(stats.market_cap_usd, 'compact') : 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Dominance: {stats?.market_dominance_percentage ? `${stats.market_dominance_percentage.toFixed(2)}%` : 'N/A'}
              </div>
            </CardContent>
          </Card>

          {/* Latest Block */}
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-purple-400">Latest Block</CardTitle>
              <Hash className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-xl sm:text-2xl font-bold text-purple-300 break-words">
                {stats?.best_block_height ? formatNumber(stats.best_block_height) : 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stats?.best_block_time ? formatDistanceToNow(new Date(stats.best_block_time + ' UTC'), { addSuffix: true }) : 'N/A'}
              </div>
            </CardContent>
          </Card>

          {/* 24h Transactions */}
          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-orange-400">24h Transactions</CardTitle>
              <Activity className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-xl sm:text-2xl font-bold text-orange-300 break-words">
                {stats?.transactions_24h ? formatNumber(stats.transactions_24h, 'compact') : 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Volume: {stats?.volume_24h ? formatCurrency(stats.volume_24h, 'compact') : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Price Chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Price Trend (24h)</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis 
                    dataKey="time" 
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => formatCurrency(value, 'compact')}
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any) => [formatCurrency(value), 'Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Volume Chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Volume Trend (24h)</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis 
                    dataKey="time" 
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => formatNumber(value, 'compact')}
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any) => [formatNumber(value, 'compact'), 'Volume']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Network Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Network Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Blocks:</span>
                <span className="font-medium">{stats?.blocks ? formatNumber(stats.blocks) : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Transactions:</span>
                <span className="font-medium">{stats?.transactions ? formatNumber(stats.transactions, 'compact') : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blockchain Size:</span>
                <span className="font-medium">
                  {stats?.blockchain_size ? `${(stats.blockchain_size / 1e9).toFixed(2)} GB` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Circulation:</span>
                <span className="font-medium">
                  {stats?.circulation ? formatNumber(stats.circulation / 1e8, 'compact') + ` ${symbol}` : 'N/A'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Mempool Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Mempool Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending Transactions:</span>
                <span className="font-medium">{stats?.mempool_transactions ? formatNumber(stats.mempool_transactions) : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mempool Size:</span>
                <span className="font-medium">
                  {stats?.mempool_size ? `${(stats.mempool_size / 1e6).toFixed(2)} MB` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TPS:</span>
                <span className="font-medium">{stats?.mempool_tps ? stats.mempool_tps.toFixed(2) : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Fees (USD):</span>
                <span className="font-medium">
                  {stats?.mempool_total_fee_usd ? formatCurrency(stats.mempool_total_fee_usd) : 'N/A'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Fee Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Fee Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Fee (24h):</span>
                <span className="font-medium">
                  {stats?.average_transaction_fee_usd_24h ? formatCurrency(stats.average_transaction_fee_usd_24h) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Median Fee (24h):</span>
                <span className="font-medium">
                  {stats?.median_transaction_fee_usd_24h ? formatCurrency(stats.median_transaction_fee_usd_24h) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Suggested Fee:</span>
                <span className="font-medium">
                  {stats?.suggested_transaction_fee_per_byte_sat ? `${stats.suggested_transaction_fee_per_byte_sat} sat/byte` : 'N/A'}
                </span>
              </div>
              {stats?.largest_transaction_24h && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Largest TX (24h):</span>
                  <span className="font-medium">
                    {formatCurrency(stats.largest_transaction_24h.value_usd, 'compact')}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info for Bitcoin */}
        {blockchain === 'bitcoin' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mining Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span className="font-medium">{stats.difficulty ? formatNumber(stats.difficulty, 'compact') : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hashrate (24h):</span>
                  <span className="font-medium">
                    {stats.hashrate_24h ? `${(parseFloat(stats.hashrate_24h) / 1e18).toFixed(2)} EH/s` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Retarget:</span>
                  <span className="font-medium">
                    {stats.next_retarget_time_estimate ? formatDistanceToNow(new Date(stats.next_retarget_time_estimate + ' UTC'), { addSuffix: true }) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nodes:</span>
                  <span className="font-medium">{stats.nodes ? formatNumber(stats.nodes) : 'N/A'}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Economic Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inflation (24h):</span>
                  <span className="font-medium">
                    {stats.inflation_usd_24h ? formatCurrency(stats.inflation_usd_24h, 'compact') : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CDD (24h):</span>
                  <span className="font-medium">
                    {stats.cdd_24h ? formatNumber(stats.cdd_24h, 'compact') : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HODLing Addresses:</span>
                  <span className="font-medium">
                    {stats.hodling_addresses ? formatNumber(stats.hodling_addresses, 'compact') : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainStats;
