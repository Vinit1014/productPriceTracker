export const dummyProducts: Product[] = [
    {
      id: '1',
      url: 'https://www.flipkart.com/product1',
      title: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      currentPrice: 15999,
      reviews: 4.5,
      totalPurchases: 1000,
      priceHistory: [
        { date: '2023-06-01', price: 16999 },
        { date: '2023-06-15', price: 15999 },
      ],
    },
    {
      id: '2',
      url: 'https://www.flipkart.com/product2',
      title: 'Laptop Pro',
      description: 'High-performance laptop for professionals',
      currentPrice: 59999,
      reviews: 4.7,
      totalPurchases: 500,
      priceHistory: [
        { date: '2023-05-01', price: 64999 },
        { date: '2023-06-01', price: 59999 },
      ],
    },
    {
      id: '3',
      url: 'https://www.flipkart.com/product3',
      title: 'Wireless Earbuds',
      description: 'True wireless earbuds with noise cancellation',
      currentPrice: 2999,
      reviews: 4.2,
      totalPurchases: 2000,
      priceHistory: [
        { date: '2023-04-15', price: 3499 },
        { date: '2023-05-15', price: 3299 },
        { date: '2023-06-15', price: 2999 },
      ],
    },
]