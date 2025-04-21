// This is a mock API service that would normally fetch data from a real cryptocurrency API
// like CoinGecko, CoinMarketCap, etc.

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  image: string
  circulating_supply: number
}

export async function fetchCryptoData(): Promise<CryptoData[]> {
  // In a real application, you would fetch from an actual API
  // Example: return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
  //   .then(response => response.json())

  // For demo purposes, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "bitcoin",
          symbol: "btc",
          name: "Bitcoin",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 60123.45,
          market_cap: 1167387834231,
          market_cap_rank: 1,
          total_volume: 28736495823,
          price_change_percentage_24h: 2.34,
          circulating_supply: 19456789,
        },
        {
          id: "ethereum",
          symbol: "eth",
          name: "Ethereum",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 3245.67,
          market_cap: 389765432198,
          market_cap_rank: 2,
          total_volume: 15678943210,
          price_change_percentage_24h: -1.23,
          circulating_supply: 120345678,
        },
        {
          id: "binancecoin",
          symbol: "bnb",
          name: "Binance Coin",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 567.89,
          market_cap: 87654321098,
          market_cap_rank: 3,
          total_volume: 2345678901,
          price_change_percentage_24h: 0.45,
          circulating_supply: 154321098,
        },
        {
          id: "solana",
          symbol: "sol",
          name: "Solana",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 123.45,
          market_cap: 54321098765,
          market_cap_rank: 4,
          total_volume: 3456789012,
          price_change_percentage_24h: 5.67,
          circulating_supply: 440123456,
        },
        {
          id: "cardano",
          symbol: "ada",
          name: "Cardano",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 0.56,
          market_cap: 19876543210,
          market_cap_rank: 5,
          total_volume: 987654321,
          price_change_percentage_24h: -2.34,
          circulating_supply: 35456789012,
        },
        {
          id: "ripple",
          symbol: "xrp",
          name: "XRP",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 0.78,
          market_cap: 18765432109,
          market_cap_rank: 6,
          total_volume: 876543210,
          price_change_percentage_24h: 1.23,
          circulating_supply: 24012345678,
        },
        {
          id: "polkadot",
          symbol: "dot",
          name: "Polkadot",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 7.89,
          market_cap: 9876543210,
          market_cap_rank: 7,
          total_volume: 765432109,
          price_change_percentage_24h: -0.98,
          circulating_supply: 1250123456,
        },
        {
          id: "dogecoin",
          symbol: "doge",
          name: "Dogecoin",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 0.12,
          market_cap: 8765432109,
          market_cap_rank: 8,
          total_volume: 654321098,
          price_change_percentage_24h: 3.45,
          circulating_supply: 73012345678,
        },
        {
          id: "avalanche",
          symbol: "avax",
          name: "Avalanche",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 34.56,
          market_cap: 7654321098,
          market_cap_rank: 9,
          total_volume: 543210987,
          price_change_percentage_24h: -1.23,
          circulating_supply: 220123456,
        },
        {
          id: "chainlink",
          symbol: "link",
          name: "Chainlink",
          image: "/placeholder.svg?height=32&width=32",
          current_price: 18.90,
          market_cap: 6543210987,
          market_cap_rank: 10,
          total_volume: 432109876,
          price_change_percentage_24h: 2.34,
          circulating_supply: 345678901,
        },
      ])
    }, 1000) // Simulate network delay
  })
}

export async function fetchCryptoHistory(cryptoId: string, timeframe: string) {
  // In a real application, you would fetch historical data from an API
  // Example: return fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`)
  //   .then(response => response.json())

  // For demo purposes, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate mock price history data based on timeframe
      const data = generateMockHistoryData(timeframe)
      resolve(data)
    }, 800) // Simulate network delay
  })
}

function generateMockHistoryData(timeframe: string) {
  const now = new Date()
  const data = []

  let points = 24
  let interval = 60 * 60 * 1000 // 1 hour in milliseconds

  if (timeframe === "7d") {
    points = 7 * 24
    interval = 60 * 60 * 1000 // 1 hour
  } else if (timeframe === "30d") {
    points = 30
    interval = 24 * 60 * 60 * 1000 // 1 day
  } else if (timeframe === "1y") {
    points = 365
    interval = 24 * 60 * 60 * 1000 // 1 day
  }

  const basePrice = 50000 // Base price for Bitcoin
  let currentPrice = basePrice

  for (let i = points; i >= 0; i--) {
    const date = new Date(now.getTime() - i * interval)

    // Add some randomness to the price movement
    const randomFactor = (Math.random() - 0.5) * 0.02
    currentPrice = currentPrice * (1 + randomFactor)

    data.push({
      timestamp: date.getTime(),
      price: currentPrice,
    })
  }

  return {
    prices: data.map((item) => [item.timestamp, item.price]),
  }
}
