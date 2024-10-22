import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ProductForm from './components/ProductForm'
import { dummyProducts } from './constants/data'
import { Product } from './types'
import ProductList from './components/ProductList'

function App() {

  const [products, setProducts] = useState<Product[]>(dummyProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(dummyProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddProduct = (product: Product) => {
    // Check if the product is already in the list
    const isProductInList = products.some(p => p.id === product.id)
    if (!isProductInList) {
      setProducts(prevProducts => [...prevProducts, product])
      setFilteredProducts(prevFiltered => [...prevFiltered, product])
      setSelectedProduct(product) // Show the newly added product in the details section
      setError(null)
    } else {
      setError('Product is already in the list.')
    }
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handleSearch = (searchTerm: string, minPrice: number, maxPrice: number) => {
    try {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.currentPrice >= minPrice &&
        (maxPrice === 0 || product.currentPrice <= maxPrice)
      )
      setFilteredProducts(filtered)
      setError(null)
    } catch (err) {
      setError('An error occurred while filtering products.')
    }
  }

  const handleFetchedProduct = (product: Product) => {
    // You can do something with the fetched product here, such as previewing it, logging it, etc.
    console.log('Product fetched:', product);
  };

  return (
    <>
      <Navbar/>
      <div className='container mx-auto flex flex-col items-center justify-center mt-24 px-4'>
        <div className='w-full max-w-11/12'>
          {/* Product Form */}
          <ProductForm onAddProduct={handleAddProduct} />

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        
        {/* Selected Product Details */}
        <div className='w-full max-w-11/12  p-6 mt-6 border rounded-lg bg-white shadow-md'>
          {selectedProduct ? (
            <div>
              <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
              <p className="mt-2">{selectedProduct.description}</p>
              <p className="font-bold text-xl mt-4">Price: ₹{selectedProduct.currentPrice.toFixed(2)}</p>
              <p className="mt-2">Reviews: {selectedProduct.reviews}/5</p>
              <p>Total Purchases: {selectedProduct.totalPurchases}</p>
              <h3 className="font-semibold mt-6">Price History</h3>
              <ul className="mt-2">
                {selectedProduct.priceHistory.map((item, index) => (
                  <li key={index}>
                    {new Date(item.date).toLocaleDateString()}: ₹{item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No product fetched. Try to fetch details of any product by entering URL of any product and clicking on "Fetch details"</p>
          )}
        </div>
      </div>


      <div className="container mx-auto mt-16">
        {/* Product List */}
        <ProductList products={filteredProducts} />
      </div>
    </>
  )
}

export default App
