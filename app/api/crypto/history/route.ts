import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY
const API_URL = process.env.NEXT_PUBLIC_COINMARKETCAP_API_URL

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const days = searchParams.get('days') || '30'
    const convert = searchParams.get('convert') || 'USD'

    if (!id) {
      return NextResponse.json(
        { error: 'Cryptocurrency ID is required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `${API_URL}/cryptocurrency/quotes/historical?id=${id}&count=${days}&interval=daily&convert=${convert}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': API_KEY!,
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch historical data from CoinMarketCap')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching crypto history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cryptocurrency historical data' },
      { status: 500 }
    )
  }
} 