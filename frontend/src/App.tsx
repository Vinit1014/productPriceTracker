
import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ProductForm from './components/ProductForm'
import { Product } from './types'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import { BASE_URL } from './utils/constants'

function App() {
  const [productss, setProductss] = useState<Product[]>([]) 
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      const response = await fetch(BASE_URL + '/api/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProductss(data.products)        
      setFilteredProducts(data.products)  
      setError(null)
    } catch (err) {
      setError('Failed to load products. Please try again later.')
    }
  }

  useEffect(() => {
    fetchProducts() 
  }, []) 

  const handleAddProduct = (product: Product) => {
    setSelectedProduct(product) 
    fetchProducts();
  }

  const handleSearch = (searchTerm: string) => {
    console.log("Search term: " + searchTerm)
    if (!searchTerm) {
      setFilteredProducts(productss);
    }

    const filtered = productss.filter((product: Product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log("Filtered products:", filtered)

    setFilteredProducts(filtered) 
  }

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className='container mx-auto flex flex-col items-center justify-center mt-24 px-4'>
        <div className='w-full max-w-11/12'>
          
          <ProductForm onAddProduct={handleAddProduct} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        <ProductDetails product={selectedProduct} />
      </div>

      <div className="container mx-auto mt-16">
        <ProductList products={filteredProducts} fetchProducts={fetchProducts} />
      </div>
    </>
  )
}

export default App
