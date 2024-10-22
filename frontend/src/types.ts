export interface Product {
    id: string
    url: string
    title: string
    description: string
    currentPrice: number
    reviews: number
    totalPurchases: number
    priceHistory: PriceHistoryItem[]
  }
  
export interface PriceHistoryItem {
    date: string
    price: number
}