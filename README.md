# 🔗 Blockchain Explorer - BlockSeer Data Glimpse

A modern, real-time blockchain data explorer built with React, TypeScript, and Tailwind CSS. This application provides an intuitive interface to explore blockchain data across multiple cryptocurrencies with beautiful 3D effects and animations.

![Blockchain Explorer](public/cryptocurrency.png)

## ✨ Features

### 🎨 Modern UI/UX
- **3D Card Effects**: Interactive hover animations with depth and rotation
- **BorderBeam Animations**: Cryptocurrency-specific animated borders
- **LineShadowText**: Elegant text effects with animated shadows
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Modern dark theme with beautiful gradients

### 🚀 Real-time Data
- **Multi-blockchain Support**: Bitcoin, Ethereum, Litecoin, Dogecoin, and more
- **Live API Integration**: Real-time data from Blockchair API
- **Advanced Filtering**: Filter by blockchain families (Bitcoin, Ethereum, DeFi, Privacy coins)
- **Comprehensive Stats**: Block height, difficulty, hashrate, market cap, and more

### 🔧 Technical Features
- **Error Handling**: Robust error handling with retry mechanisms
- **Caching**: Smart API response caching for better performance
- **API Rate Limiting**: Built-in rate limiting and backoff strategies
- **Loading States**: Smooth loading animations and skeleton screens

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion (3D effects)
- **API**: Blockchair API
- **Package Manager**: Bun

## 📦 Dependencies

### Core
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling

### UI Components
- Radix UI primitives
- shadcn/ui component library
- Custom 3D card components
- MagicUI effects (BorderBeam, LineShadowText)

### Development
- ESLint for code quality
- TypeScript for type safety
- PostCSS for CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Blockchair API key (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blockseer-data-glimpse
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Blockchair API key:
   ```env
   VITE_BLOCKCHAIR_API_KEY=A_your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Visit `http://localhost:5173`

## 📋 API Key Setup

For detailed API key setup instructions, see [API_KEY_SETUP.md](API_KEY_SETUP.md).

### Benefits of API Key:
- Higher rate limits
- Access to premium endpoints
- Better reliability
- Priority support

**Note**: The application works without an API key but with limited requests.

## 🎯 Usage

### Navigation
- **Filter Tabs**: Switch between different blockchain categories
- **Cryptocurrency Cards**: Click/hover for detailed information
- **Responsive Grid**: Automatically adjusts to screen size

### Filters Available
- **All Blockchains**: Complete overview
- **Bitcoin Family**: Bitcoin, Bitcoin Cash, Litecoin
- **Ethereum**: Ethereum ecosystem
- **Smart Contracts**: DeFi and smart contract platforms
- **Privacy Coins**: Privacy-focused cryptocurrencies

### Card Features
- **3D Hover Effects**: Interactive depth and rotation
- **Animated Borders**: Color-coded by cryptocurrency
- **Real-time Data**: Live blockchain statistics
- **Performance Metrics**: Hash rate, difficulty, block time

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── magicui/        # Custom UI effects
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── utils/              # Utility functions
└── lib/                # Library configurations

public/                 # Static assets
├── cryptocurrency.png  # Favicon
└── robots.txt         # SEO configuration
```

## 🔧 Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run build:dev` - Build for development
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Consistent component structure
- Comprehensive error handling

## 🎨 Customization

### Adding New Cryptocurrencies
1. Update the cryptocurrency list in `services/blockchairApi.ts`
2. Add color mapping in `components/CryptoCard.tsx`
3. Update filter categories if needed

### Styling
- Modify Tailwind config in `tailwind.config.ts`
- Custom animations and effects in component files
- Color schemes and themes in CSS variables

## 🚀 Deployment

### Build for Production
```bash
bun run build
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set build command: `bun run build`
3. Set output directory: `dist`
4. Add environment variables in platform settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 👨‍💻 Author

**Ravikant Chauhan**
- GitHub: ravikantchauhan246
- Email: chauhan@ravikant.dev

## 🙏 Acknowledgments

- [Blockchair API](https://blockchair.com/api) for blockchain data
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible primitives

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
- **Bundle Size**: Optimized with Vite tree-shaking
- **API Caching**: Smart caching reduces API calls
- **Loading Time**: < 2s on 3G networks

---

Built with ❤️ by Ravikant Chauhan | Powered by React & Blockchair API