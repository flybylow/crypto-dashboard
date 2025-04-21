"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface TopCryptosProps {
  cryptoData: any[]
  isLoading: boolean
}

export function TopCryptos({ cryptoData, isLoading }: TopCryptosProps) {
  // Use mock data if no data is available
  const data =
    cryptoData.length > 0
      ? cryptoData
      : [
          {
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "btc",
            current_price: 60123.45,
            price_change_percentage_24h: 2.34,
            image: "/placeholder.svg?height=24&width=24",
          },
          {
            id: "ethereum",
            name: "Ethereum",
            symbol: "eth",
            current_price: 3245.67,
            price_change_percentage_24h: -1.23,
            image: "/placeholder.svg?height=24&width=24",
          },
          {
            id: "binancecoin",
            name: "Binance Coin",
            symbol: "bnb",
            current_price: 567.89,
            price_change_percentage_24h: 0.45,
            image: "/placeholder.svg?height=24&width=24",
          },
          {
            id: "solana",
            name: "Solana",
            symbol: "sol",
            current_price: 123.45,
            price_change_percentage_24h: 5.67,
            image: "/placeholder.svg?height=24&width=24",
          },
          {
            id: "cardano",
            name: "Cardano",
            symbol: "ada",
            current_price: 0.56,
            price_change_percentage_24h: -2.34,
            image: "/placeholder.svg?height=24&width=24",
          },
        ]

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
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

  return (
    <div className="space-y-4">
      {data.slice(0, 5).map((crypto) => (
        <div key={crypto.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={crypto.image || "/placeholder.svg"}
              width={32}
              height={32}
              alt={crypto.name}
              className="rounded-full"
            />
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
