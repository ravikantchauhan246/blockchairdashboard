// API Error types
export interface APIError {
  message: string;
  status?: number;
  code?: string;
}

// Create a standardized error from different error types
export const createAPIError = (error: unknown): APIError => {
  if (error instanceof Error) {
    // Check if it's a fetch error with status
    const match = error.message.match(/Error fetching .* data: (\d+)/);
    if (match) {
      const status = parseInt(match[1]);
      return {
        message: getErrorMessage(status),
        status,
        code: getErrorCode(status)
      };
    }
    
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  };
};

// Get user-friendly error message based on HTTP status
const getErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'Invalid request. Please check your parameters.';
    case 401:
      return 'Authentication required. Please check your API key.';
    case 403:
      return 'Access forbidden. You may have exceeded rate limits.';
    case 404:
      return 'Blockchain or resource not found.';
    case 429:
      return 'Rate limit exceeded. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    case 502:
      return 'Bad gateway. The service may be temporarily unavailable.';
    case 503:
      return 'Service unavailable. Please try again later.';
    default:
      return 'Network error. Please check your connection and try again.';
  }
};

// Get error code based on HTTP status
const getErrorCode = (status: number): string => {
  switch (status) {
    case 400:
      return 'BAD_REQUEST';
    case 401:
      return 'UNAUTHORIZED';
    case 403:
      return 'FORBIDDEN';
    case 404:
      return 'NOT_FOUND';
    case 429:
      return 'RATE_LIMITED';
    case 500:
      return 'INTERNAL_ERROR';
    case 502:
      return 'BAD_GATEWAY';
    case 503:
      return 'SERVICE_UNAVAILABLE';
    default:
      return 'NETWORK_ERROR';
  }
};

// Retry utility with exponential backoff
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: unknown;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on certain errors
      const apiError = createAPIError(error);
      if (apiError.status && [400, 401, 403, 404].includes(apiError.status)) {
        throw error;
      }
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

// Check if we're hitting rate limits and should use caching
export const shouldUseCache = (error: APIError): boolean => {
  return error.status === 429 || error.code === 'RATE_LIMITED';
};

// Simple in-memory cache for API responses
class SimpleCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  set(key: string, data: any, ttlMs: number = 30000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    });
  }
  
  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  size(): number {
    return this.cache.size;
  }
}

export const apiCache = new SimpleCache();

// Cached fetch wrapper
export const cachedFetch = async (url: string, ttlMs: number = 30000): Promise<Response> => {
  const cached = apiCache.get(url);
  if (cached) {
    return new Response(JSON.stringify(cached), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    apiCache.set(url, data, ttlMs);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return response;
};
