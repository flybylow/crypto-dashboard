"use client"

import { ArrowDown, ArrowUp, Bitcoin, Gem, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Crypto icons with Lucide icons as fallbacks
const cryptoIcons = {
  bitcoin: <Bitcoin className="h-5 w-5 text-[#F7931A]" />,
  ethereum: <Gem className="h-5 w-5 text-[#627EEA]" />,
  solana: <Gem className="h-5 w-5 text-[#14F195]" />,
}

interface WatchListProps {
  cryptoData: any[]
  isLoading: boolean
  onSelect?: (cryptoId: string) => void
  watchlistIds: string[]
}

export function WatchList({ cryptoData, isLoading, onSelect, watchlistIds }: WatchListProps) {
  const watchlistData = watchlistIds
    .map((id) => cryptoData.find((crypto) => crypto.id === id))
    .filter((crypto): crypto is NonNullable<typeof crypto> => crypto !== undefined)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-1 h-3 w-12" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-20 ml-auto" />
              <Skeleton className="mt-1 h-3 w-16 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (watchlistData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <Star className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium">No coins in watchlist</h3>
        <p className="mt-2 text-sm text-muted-foreground">Add cryptocurrencies to your watchlist to track them here</p>
        <Button className="mt-4" variant="outline">
          Add Coins
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
      {watchlistData.map((crypto) => (
        <div 
          key={crypto.id} 
          className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
          onClick={() => onSelect?.(crypto.id)}
        >
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center p-2">
              {cryptoIcons[crypto.id as keyof typeof cryptoIcons] || (
                <span className="font-bold text-xs">{crypto.symbol.substring(0, 3).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h3 className="font-medium">{crypto.name}</h3>
              <p className="text-xs text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p
              className={cn(
                "text-xs flex items-center justify-end",
                crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500",
              )}
            >
              {crypto.price_change_percentage_24h >= 0 ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
              )}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
