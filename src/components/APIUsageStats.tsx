import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { fetchAPIUsageStats } from '../services/blockchairApi';

interface APIUsageProps {
  className?: string;
}

interface UsageStats {
  requests_left: number;
  requests_per_hour: number;
  requests_per_hour_left: number;
  requests_per_day: number;
  requests_per_day_left: number;
  plan: string;
}

const APIUsageStats: React.FC<APIUsageProps> = ({ className }) => {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);      try {
        const response = await fetchAPIUsageStats();
        if (response.data) {
          setStats(response.data as UsageStats);
        }      } catch (err: any) {
        if (err.message.includes('API key is required')) {
          setError('API key required for usage stats');
        } else if (err.message.includes('Premium stats not available')) {
          setError('Premium stats not available for this API plan');
        } else {
          setError('Failed to fetch API usage statistics');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
          <CardDescription>Loading usage statistics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
          <CardDescription className="text-amber-600">{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }
  const hourlyUsagePercent = stats.requests_per_hour && stats.requests_per_hour_left !== undefined ? 
    ((stats.requests_per_hour - stats.requests_per_hour_left) / stats.requests_per_hour) * 100 : 0;
  const dailyUsagePercent = stats.requests_per_day && stats.requests_per_day_left !== undefined ? 
    ((stats.requests_per_day - stats.requests_per_day_left) / stats.requests_per_day) * 100 : 0;

  return (
    <Card className={className}>
      <CardHeader>        <CardTitle className="flex items-center justify-between">
          API Usage
          <Badge variant="outline">{stats.plan || 'Unknown'}</Badge>
        </CardTitle>
        <CardDescription>Current API usage statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Hourly Usage</span>
            <span>{(stats.requests_per_hour || 0) - (stats.requests_per_hour_left || 0)} / {stats.requests_per_hour || 0}</span>
          </div>
          <Progress value={hourlyUsagePercent} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {stats.requests_per_hour_left || 0} requests remaining this hour
          </p>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Daily Usage</span>
            <span>{(stats.requests_per_day || 0) - (stats.requests_per_day_left || 0)} / {stats.requests_per_day || 0}</span>
          </div>
          <Progress value={dailyUsagePercent} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {stats.requests_per_day_left || 0} requests remaining today
          </p>
        </div><div className="pt-2 border-t">
          <p className="text-sm font-medium">
            Total Requests Left: <span className="text-green-600">{(stats.requests_left || 0).toLocaleString()}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIUsageStats;
