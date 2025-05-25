import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRecentBlocks, fetchRecentTransactions } from '../services/blockchairApi';
import { formatDistanceToNow } from 'date-fns';

interface Block {
  id: number;
  hash: string;
  time: string;
  transaction_count?: number;
  size?: number;
}

interface Transaction {
  hash: string;
  time: string;
  block_id: number;
  fee?: number;
  input_total?: number;
  output_total?: number;
}

interface BlockchainDetailsProps {
  blockchain: string;
  name: string;
}

const BlockchainDetails: React.FC<BlockchainDetailsProps> = ({ blockchain, name }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [blocksData, transactionsData] = await Promise.allSettled([
          fetchRecentBlocks(blockchain, 5),
          fetchRecentTransactions(blockchain, 5)
        ]);

        if (blocksData.status === 'fulfilled' && blocksData.value.data) {
          const blocksList = Object.values(blocksData.value.data).slice(0, 5) as Block[];
          setBlocks(blocksList);
        }

        if (transactionsData.status === 'fulfilled' && transactionsData.value.data) {
          const transactionsList = Object.values(transactionsData.value.data).slice(0, 5) as Transaction[];
          setTransactions(transactionsList);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching blockchain details:', err);
        setError('Failed to fetch blockchain details');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [blockchain]);

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Blocks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Blocks</CardTitle>
          <CardDescription>Latest blocks on the {name} blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {blocks.map((block, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <div>
                    <p className="font-medium text-sm">#{block.id}</p>
                    <p className="text-xs text-gray-500">{formatHash(block.hash)}</p>
                    <p className="text-xs text-gray-400">
                      {block.time ? formatDistanceToNow(new Date(block.time + ' UTC'), { addSuffix: true }) : 'Unknown'}
                    </p>
                  </div>
                  <div className="text-right">
                    {block.transaction_count && (
                      <Badge variant="secondary" className="text-xs">
                        {block.transaction_count} txs
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest transactions on the {name} blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <div>
                    <p className="font-medium text-sm">{formatHash(tx.hash)}</p>
                    <p className="text-xs text-gray-500">Block #{tx.block_id}</p>
                    <p className="text-xs text-gray-400">
                      {tx.time ? formatDistanceToNow(new Date(tx.time + ' UTC'), { addSuffix: true }) : 'Unknown'}
                    </p>
                  </div>
                  <div className="text-right">
                    {tx.output_total && (
                      <p className="text-sm font-medium">{formatAmount(tx.output_total)}</p>
                    )}
                    {tx.fee && (
                      <p className="text-xs text-gray-500">Fee: {formatAmount(tx.fee)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockchainDetails;
