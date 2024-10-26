import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { Product } from '../types'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

interface ProductListProps {
  products: Product[]
  fetchProducts: () => void 
}

const ProductList: React.FC<ProductListProps> = ({ products, fetchProducts }) => {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRecheckPrice = async (id: string) => {
    setLoading(id) 
    setError(null) 

    try {
      await axios.put(`${BASE_URL}/api/products/${id}`)
      console.log(`Price rechecked for product: ${id}`)

      fetchProducts();
    } catch (err) {
      console.error('Error rechecking price:', err)
      setError('Failed to recheck price. Please try again.')
    } finally {
      setLoading(null) 
    }
  }
  
  if (!products || products.length === 0) {
    return <p className="text-center text-red-500 m-12">No products found. Try adding a product or adjusting your search.</p>
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">List of Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onRecheckPrice={handleRecheckPrice}
            loading={loading === product._id} 
            error={error} 
          />
        ))}
      </div>
    </>
  )
}

export default ProductList
