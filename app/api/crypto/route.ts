import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY
const API_URL = process.env.NEXT_PUBLIC_COINMARKETCAP_API_URL

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '10'
    const start = searchParams.get('start') || '1'
    const convert = searchParams.get('convert') || 'USD'

    const response = await fetch(
      `${API_URL}/cryptocurrency/listings/latest?start=${start}&limit=${limit}&convert=${convert}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': API_KEY!,
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data from CoinMarketCap')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cryptocurrency data' },
      { status: 500 }
    )
  }
} 