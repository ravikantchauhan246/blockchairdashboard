# Blockchair API Key Setup Instructions

## How to Set Up Your Blockchair API Key

### 1. Environment Configuration

1. Open the `.env` file in the root directory of your project
2. Replace `your_api_key_here` with your actual Blockchair API key:

```
VITE_BLOCKCHAIR_API_KEY=A_your_actual_api_key_here
```

**Note**: Blockchair API keys typically start with "A_" followed by your key.

### 2. Benefits of Using API Key

With your API key, you get:

- **Higher Rate Limits**: Much higher request limits compared to the free tier
- **Premium Endpoints**: Access to additional data and advanced features
- **Priority Support**: Better API response times and priority handling
- **Usage Analytics**: Track your API usage with detailed statistics
- **Extended Data**: Access to more detailed blockchain information

### 3. API Key Features Implemented

The application now supports:

✅ **Automatic API Key Integration**: All API calls will include your key automatically
✅ **Rate Limit Monitoring**: Track your API usage in real-time
✅ **Premium Endpoints**: Access to blocks, transactions, and address data
✅ **Enhanced Caching**: Optimized caching to reduce API calls
✅ **Error Handling**: Better error messages and retry logic

### 4. Usage Statistics

If you have a premium API key, you'll see:

- Current hourly and daily usage
- Remaining requests
- Your plan details
- Usage history

### 5. Security Notes

- ✅ The API key is stored in environment variables (secure)
- ✅ The key is only used on the client side for public blockchain data
- ✅ Never commit your `.env` file to version control
- ✅ The key is prefixed with `VITE_` so it's available in the browser

### 6. Restart Required

After adding your API key to the `.env` file, restart your development server:

```bash
npm run dev
# or
bun dev
```

### 7. Verify Setup

Once configured, you should see:

1. API request cost logging in the browser console
2. Higher rate limits for API calls
3. Access to additional blockchain data
4. API usage statistics (if premium plan)

### 8. Troubleshooting

If you encounter issues:

1. **Invalid API Key**: Check the key format (should start with "A_")
2. **Rate Limits**: Even with a key, you may hit limits on high usage
3. **Environment Variables**: Ensure the `.env` file is in the root directory
4. **Server Restart**: Always restart after changing environment variables

### 9. API Key Plans

Blockchair offers different API plans:

- **Free**: Limited requests per hour
- **Hobbyist**: Higher limits for personal projects
- **Developer**: Professional limits for applications
- **Enterprise**: Custom limits for large-scale usage

Check your plan details in the API usage statistics component.
