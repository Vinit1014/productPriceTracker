export interface Product {
    id: string
    url: string
    title: string
    description: string
    currentPrice: string
    reviews: number
    totalRatings: string
    priceHistory: PriceHistoryItem[]
}
  
export interface PriceHistoryItem {
    date: string
    price: string
}