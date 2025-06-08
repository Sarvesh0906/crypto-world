# CryptoWorld - Advanced Cryptocurrency Dashboard

<!-- ![CryptoWorld Screenshot](https://./cryptoworld-screenshot.png) -->

🎥 **[Watch Application Demo](#)**

---

## 🚀 Project Overview

CryptoWorld is a modern cryptocurrency analytics platform, which is built with React and Redux Toolkit, offering real-time market data, comprehensive coin analytics, detailed cryptocurrency exchange stats and cryptocurrency news aggregation.

### Highlights:
- Real-time cryptocurrency price tracking
- Interactive historical data visualization
- Exchange comparison tools
- News aggregation from top sources
- Responsive design with a mobile-first approach

---

## ✨ Key Features

### Core Functionality
- 🌐 Global Crypto Statistics Dashboard  
- 📊 Detailed Coin Analytics with interactive charts  
- 🔁 Exchange Comparison with trust scores  
- 📰 News Aggregator with category filtering  
- 📱 Responsive Navigation with mobile-optimized menu  

### Advanced Features
- ⚡ Redux Toolkit Query for efficient data fetching and caching  
- 📈 Chart.js Integration for interactive data visualization  
- ❗ Error Handling with toast notifications  
- 🧭 Dynamic Routing for seamless navigation  
- 🚀 Performance Optimized components  

---

## 🧰 Technology Stack

### Frontend Architecture
- **React 19** with **Vite** build tool  
- **Redux Toolkit** with **RTK Query**  
- **Material-UI v7** for UI components  
- **React Router v7** for navigation  
- **Chart.js v4** for charting  

### APIs & Data
- 🪙 **CoinRanking API** - Crypto market data  
- 🗞️ **News API 14** - News aggregation  
- 💱 **Coingecko API** - Exchange info  

### Development Tools
- **Tailwind CSS** - Utility-first styling  
- **ESLint & Prettier** - Code linting and formatting  
- **React Toastify** - Notifications  
- **Vite** - Fast build & dev server  

---

## ⚙️ Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [RapidAPI](https://rapidapi.com/) account with access to:
  - CoinRanking API
  - News API 14
  - Coingecko API

### Setup Instructions

#### 1. Clone the repository:

```bash
git clone https://github.com/Sarvesh0906/crypto-world
cd crypto-world
```

#### 2. Install dependencies:
```bash
npm install
```

#### 3. Configure environment variables:
```bash
cp .env.example .env
```

#### 4. Edit .env file with your API keys:
```env
VITE_CRYPTO_API_URL=your_coin_api_url
VITE_CRYPTO_RAPIDAPI_HOST=coinranking1.p.rapidapi.com
VITE_CRYPTO_RAPIDAPI_KEY=your_api_key

VITE_NEWS_API_URL=your_news_api_url
VITE_NEWS_RAPIDAPI_HOST=news-api14.p.rapidapi.com
VITE_NEWS_RAPIDAPI_KEY=your_api_key

VITE_EXCHANGE_API_URL=your_exchange_api_url
```

#### 5. Run the development server:
```bash
npm run dev
```

#### 6. Visit the app in your browser:
```bash
http://localhost:3000 # If using Create React App
```
or
```bash
http://localhost:5173 # If using Vite
```


## 📦 State Management

State in CryptoWorld is managed using **Redux Toolkit** and **RTK Query**, ensuring robust and maintainable data flow across the application.

### 🔑 Key Features:

- ✅ **RTK Query** for automatic caching and background refetching  
- ♻️ **Optimized re-renders** with memoized selectors and `React.memo`  
- 🚨 **Centralized error handling** and built-in loading states  

---

## ⚡ Performance Optimizations

To ensure a smooth and efficient user experience, CryptoWorld implements several performance best practices:

- 🚀 **Lazy Loading** of routes and heavy components for faster initial load  
- 🧠 **Memoization** using `React.memo`, `useMemo`, and `useCallback`  
- 📦 **API caching** via RTK Query to reduce redundant network calls  
- 🌿 **Clean and minimal DOM rendering** with component-level isolation  

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
