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
  try {
    const response = await fetch('/api/crypto?limit=10')
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data')
    }
    
    const data = await response.json()
    
    return data.data.map((coin: any) => ({
      id: coin.id.toString(),
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.quote.USD.price,
      price_change_percentage_24h: coin.quote.USD.percent_change_24h,
      market_cap: coin.quote.USD.market_cap,
      market_cap_rank: coin.cmc_rank,
      total_volume: coin.quote.USD.volume_24h,
      image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
      circulating_supply: coin.circulating_supply,
    }))
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    throw error
  }
}

export async function fetchCryptoHistory(cryptoId: string, timeframe: string) {
  try {
    const days = timeframe === '24h' ? 1 : 
                 timeframe === '7d' ? 7 : 
                 timeframe === '30d' ? 30 : 365
                 
    const response = await fetch(
      `/api/crypto/history?id=${cryptoId}&timeframe=${timeframe}&days=${days}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto history')
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching crypto history:', error)
    throw error
  }
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
