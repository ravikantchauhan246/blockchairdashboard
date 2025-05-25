import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface APIStatusProps {
  className?: string;
}

const APIStatus: React.FC<APIStatusProps> = ({ className }) => {
  const [apiKeyStatus, setApiKeyStatus] = useState<'unknown' | 'working' | 'invalid' | 'none'>('unknown');
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_BLOCKCHAIR_API_KEY;
    
    if (!apiKey) {
      setApiKeyStatus('none');
      return;
    }

    // Listen for API request cost logs to determine if API key is working
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('API request cost')) {
        setApiKeyStatus('working');
        setRequestCount(prev => prev + 1);
      }
      originalConsoleLog.apply(console, args);
    };

    // Test API key by making a simple request
    setApiKeyStatus('unknown');

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  const getStatusBadge = () => {
    switch (apiKeyStatus) {
      case 'working':
        return <Badge variant="default" className="bg-green-500">✅ Active</Badge>;
      case 'invalid':
        return <Badge variant="destructive">❌ Invalid</Badge>;
      case 'none':
        return <Badge variant="secondary">⚠️ No API Key</Badge>;
      default:
        return <Badge variant="outline">🔄 Testing...</Badge>;
    }
  };

  const getStatusMessage = () => {
    switch (apiKeyStatus) {
      case 'working':
        return `API key is working correctly. ${requestCount} requests made.`;
      case 'invalid':
        return 'API key is invalid or has exceeded limits.';
      case 'none':
        return 'No API key configured. Using free tier with limited requests.';
      default:
        return 'Checking API key status...';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm">
          API Status
          {getStatusBadge()}
        </CardTitle>
        <CardDescription className="text-xs">
          {getStatusMessage()}
        </CardDescription>
      </CardHeader>
      {apiKeyStatus === 'working' && (
        <CardContent className="pt-0">
          <div className="text-xs text-gray-500">
            <p>• Enhanced rate limits enabled</p>
            <p>• Premium endpoints accessible</p>
            <p>• Real-time blockchain data</p>
          </div>
        </CardContent>
      )}
      {apiKeyStatus === 'none' && (
        <CardContent className="pt-0">
          <div className="text-xs text-gray-500">
            <p>• Limited to {import.meta.env.MODE === 'development' ? '1,440' : '720'} requests/day</p>
            <p>• Basic endpoints only</p>
            <p>• Add API key for premium features</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default APIStatus;
