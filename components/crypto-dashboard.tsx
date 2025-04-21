"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp, Bitcoin, Coins, DollarSign, Gem, LineChart, Menu, RefreshCcw } from "lucide-react"
import Image from "next/image"

import { fetchCryptoData } from "@/lib/crypto-api"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PriceChart } from "@/components/price-chart"
import { WatchList } from "@/components/watch-list"

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
}

// Crypto icons with Lucide icons as fallbacks
const cryptoIcons = {
  bitcoin: <Bitcoin className="h-5 w-5 text-[#F7931A]" />,
  ethereum: <Gem className="h-5 w-5 text-[#627EEA]" />,
  binancecoin: <Coins className="h-5 w-5 text-[#F3BA2F]" />,
  solana: <Gem className="h-5 w-5 text-[#14F195]" />,
  cardano: <Gem className="h-5 w-5 text-[#0033AD]" />,
  ripple: <Gem className="h-5 w-5 text-[#23292F]" />,
  polkadot: <Gem className="h-5 w-5 text-[#E6007A]" />,
  dogecoin: <Gem className="h-5 w-5 text-[#C3A634]" />,
  avalanche: <Gem className="h-5 w-5 text-[#E84142]" />,
  chainlink: <Gem className="h-5 w-5 text-[#2A5ADA]" />,
}

export function CryptoDashboard() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin")
  const [watchlistIds, setWatchlistIds] = useState<string[]>(["bitcoin", "ethereum", "solana", "binancecoin", "cardano", "polkadot", "dogecoin", "avalanche", "chainlink"])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchCryptoData()
        setCryptoData(data)
      } catch (error) {
        console.error("Failed to fetch crypto data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
    // Set up polling for live data
    const interval = setInterval(loadData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  // Update document title when watchlist changes
  useEffect(() => {
    const watchlistNames = watchlistIds
      .map(id => cryptoData.find(c => c.id === id)?.name)
      .filter(Boolean)
      .join(", ")
    
    document.title = watchlistNames ? `CryptoTracker - ${watchlistNames}` : "CryptoTracker"
  }, [watchlistIds, cryptoData])

  const selectedCryptoData = cryptoData.find((crypto) => crypto.id === selectedCrypto) || {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    current_price: 60123.45,
    price_change_percentage_24h: 2.34,
    market_cap: 1167387834231,
    total_volume: 28736495823,
    image: "/placeholder.svg?height=32&width=32",
  }

  // Default crypto options if data isn't loaded yet
  const defaultCryptos = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
    },
    {
      id: "binancecoin",
      name: "BNB",
      symbol: "BNB",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
    },
  ]

  const cryptoOptions = cryptoData.length > 0 ? cryptoData.slice(0, 5) : defaultCryptos

  const timeframeOptions = [
    { value: "24h", label: "24h" },
    { value: "7d", label: "7d" },
    { value: "30d", label: "30d" },
    { value: "1y", label: "1y" },
  ]

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const data = await fetchCryptoData()
      setCryptoData(data)
    } catch (error) {
      console.error("Failed to fetch crypto data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWatchlistSelect = (cryptoId: string) => {
    setSelectedCrypto(cryptoId)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <Coins className="h-6 w-6" />
          <h1 className="text-lg font-semibold">CryptoTracker</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCcw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
            {isLoading ? "Updating..." : "Refresh"}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Image
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="Avatar"
              className="rounded-full"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:p-6">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">Live cryptocurrency prices and market data</p>
            </div>

            {/* Crypto Selection Icons */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {cryptoOptions.map((crypto) => (
                  <button
                    key={crypto.id}
                    className={cn(
                      "rounded-full h-10 w-10 p-2 transition-all flex items-center justify-center border-2",
                      selectedCrypto === crypto.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border",
                    )}
                    onClick={() => setSelectedCrypto(crypto.id)}
                    title={crypto.name}
                  >
                    {/* Use Lucide icons as fallbacks */}
                    {cryptoIcons[crypto.id as keyof typeof cryptoIcons] || (
                      <span className="font-bold text-xs">{crypto.symbol.substring(0, 3)}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Timeframe Selection Buttons */}
              <div className="flex items-center justify-end gap-1">
                {timeframeOptions.map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "rounded-md px-3 py-1 text-sm font-medium transition-all border",
                      selectedTimeframe === option.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border",
                    )}
                    onClick={() => setSelectedTimeframe(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {/* Show icon next to price */}
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center p-2 border border-primary/20">
                    {cryptoIcons[selectedCryptoData.id as keyof typeof cryptoIcons] || (
                      <span className="font-bold text-xs">{selectedCryptoData.symbol.substring(0, 3)}</span>
                    )}
                  </div>
                  <CardTitle className="text-2xl">${selectedCryptoData.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CardTitle>
                </div>
                <CardDescription className="flex items-center">
                  <span
                    className={cn(
                      "flex items-center",
                      selectedCryptoData.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500",
                    )}
                  >
                    {selectedCryptoData.price_change_percentage_24h >= 0 ? (
                      <ArrowUp className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4" />
                    )}
                    {Math.abs(selectedCryptoData.price_change_percentage_24h).toFixed(2)}%
                  </span>
                  <span className="ml-2 text-muted-foreground">Past {selectedTimeframe}</span>
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>USD</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Bitcoin className="h-3.5 w-3.5" />
                  <span>{selectedCryptoData.symbol.toUpperCase()}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 pb-4">
                <PriceChart
                  crypto={selectedCryptoData.id}
                  timeframe={selectedTimeframe}
                  priceChange={selectedCryptoData.price_change_percentage_24h}
                />
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Market Cap</CardTitle>
                <CardDescription>Total market value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Market Cap:</span>
                  <div className="text-2xl font-bold">${(selectedCryptoData.market_cap / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}B</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Rank #{cryptoData.findIndex((c) => c.id === selectedCryptoData.id) + 1} by market cap
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>24h Volume</CardTitle>
                <CardDescription>Trading volume in the past 24h</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(selectedCryptoData.total_volume / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}B</div>
                <p className="text-xs text-muted-foreground">
                  {((selectedCryptoData.total_volume / selectedCryptoData.market_cap) * 100).toFixed(2)}% of market cap
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Watchlist</CardTitle>
                <CardDescription>Track your favorite coins</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <LineChart className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <WatchList 
                cryptoData={cryptoData} 
                isLoading={isLoading} 
                onSelect={handleWatchlistSelect}
                watchlistIds={watchlistIds}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
