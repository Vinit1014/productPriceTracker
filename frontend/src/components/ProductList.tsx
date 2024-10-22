import React from 'react'
import { Product } from '../types'

interface ProductListProps {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    if (!products || products.length === 0) {
        return <p className="text-center text-gray-500">No products found. Try adding a product or adjusting your search.</p>
    }

    return (
        <>
            <h1>List of products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="font-bold mb-2">Current Price: ₹{product.currentPrice.toFixed(2)}</p>
                    <p className="mb-2">Reviews: {product.reviews}/5</p>
                    <p className="mb-4">Total Purchases: {product.totalPurchases}</p>
                    <h3 className="font-semibold mb-2">Price History</h3>
                    <ul className="space-y-1">
                        {product.priceHistory.map((item, index) => (
                            <li key={index} className="text-sm">
                            {new Date(item.date).toLocaleDateString()}: ₹{item.price.toFixed(2)}
                        </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => {
                            console.log(`Rechecking price for product: ${product.id}`)
                        }}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                        Recheck Price
                    </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductList