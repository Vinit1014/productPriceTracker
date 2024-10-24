// import { useState, useEffect } from 'react'
// import './App.css'
// import Navbar from './components/Navbar'
// import ProductForm from './components/ProductForm'
// import { Product } from './types'
// import ProductList from './components/ProductList'
// import ProductDetails from './components/ProductDetails'
// import { BASE_URL } from './utils/constants'

// function App() {
//   const [productss, setProductss] = useState<any>([])
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(productss);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch products from API
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(BASE_URL + '/api/products')
//       if (!response.ok) {
//         throw new Error('Failed to fetch products')
//       }
//       const data = await response.json();
//       setProductss(data.products)
//       setError(null)
//     } catch (err) {
//       setError('Failed to load products. Please try again later.')
//     }
//   }

//   useEffect(() => {
//     setFilteredProducts(productss);
//     fetchProducts() // Fetch products when the component mounts
//   }, [productss])
  
//   useEffect(() => {
//     console.log("Selected product is "+selectedProduct?.title)
//   }, [selectedProduct])

//   const handleAddProduct = (product: Product) => {
//     // Check if the product is already in the list
//     setSelectedProduct(product);
//   }

//   const handleError = (errorMessage: string) => {
//     setError(errorMessage)
//   }

//   const handleSearch = (searchTerm: string)=>{
//     console.log("I am search term "+searchTerm);
    
//     const filtered = productss.filter((product:Product)=>{
//       return product.title.toLowerCase().includes(searchTerm.toLowerCase());
//     })
//     console.log(filtered);
//     setFilteredProducts(filtered);
//   }

//   return (
//     <>
//       <Navbar onSearch={handleSearch}/>
//       <div className='container mx-auto flex flex-col items-center justify-center mt-24 px-4'>
//         <div className='w-full max-w-11/12'>
//           {/* Product Form */}
//           <ProductForm onAddProduct={handleAddProduct} />

//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </div>
//         <ProductDetails product={selectedProduct} />
//       </div>

//       <div className="container mx-auto mt-16">
//         {/* Pass the fetchProducts function and products to ProductList */}
//         <ProductList products={filteredProducts} fetchProducts={fetchProducts} />
//       </div>
//     </>
//   )
// }

// export default App


import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ProductForm from './components/ProductForm'
import { Product } from './types'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import { BASE_URL } from './utils/constants'

function App() {
  const [productss, setProductss] = useState<Product[]>([]) // Holds the full list of products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]) // Holds the filtered list
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch products from the API (on mount)
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
    setSelectedProduct(product) // Set the selected product
    fetchProducts();
  }

  // Handles search/filter functionality
  const handleSearch = (searchTerm: string) => {
    console.log("Search term: " + searchTerm)
    if (!searchTerm) {
      setFilteredProducts(productss);
    }
    // Filter the products based on the search term
    const filtered = productss.filter((product: Product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log("Filtered products:", filtered)

    setFilteredProducts(filtered) // Update the filtered list
  }

  return (
    <>
      {/* Pass the search handler to the Navbar */}
      <Navbar onSearch={handleSearch} />

      <div className='container mx-auto flex flex-col items-center justify-center mt-24 px-4'>
        <div className='w-full max-w-11/12'>
          {/* Product Form */}
          <ProductForm onAddProduct={handleAddProduct} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Product Details - For showing selected product details */}
        <ProductDetails product={selectedProduct} />
      </div>

      <div className="container mx-auto mt-16">
        {/* Pass the filtered products and the fetchProducts function to ProductList */}
        <ProductList products={filteredProducts} fetchProducts={fetchProducts} />
      </div>
    </>
  )
}

export default App
