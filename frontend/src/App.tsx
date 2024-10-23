// import { useState, useEffect } from 'react'
// import './App.css'
// import Navbar from './components/Navbar'
// import ProductForm from './components/ProductForm'
// import { dummy, dummyProducts } from './constants/data'
// import { Product } from './types'
// import ProductList from './components/ProductList'
// import ProductDetails from './components/ProductDetails'

// function App() {

//   const [products, setProducts] = useState<Product[]>(dummyProducts)
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(dummyProducts)
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(()=>{
//     console.log(selectedProduct);
//   },[selectedProduct])

//   const handleAddProduct = (product: Product) => {
//     // Check if the product is already in the list
//     const isProductInList = products.some(p => p.id === product.id)
//     if (!isProductInList) {
//       setProducts(prevProducts => [...prevProducts, product])
//       setFilteredProducts(prevFiltered => [...prevFiltered, product])
//       setSelectedProduct(product) 
//       setError(null)
//     } else {
//       setError('Product is already in the list.')
//     }
//   }

//   const handleError = (errorMessage: string) => {
//     setError(errorMessage)
//   }

//   const handleSearch = (searchTerm: string, minPrice: number, maxPrice: number) => {
//     try {
//       const filtered = products.filter(product => 
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         product.currentPrice >= minPrice &&
//         (maxPrice === 0 || product.currentPrice <= maxPrice)
//       )
//       setFilteredProducts(filtered)
//       setError(null)
//     } catch (err) {
//       setError('An error occurred while filtering products.')
//     }
//   }

//   //Currently no need
//   // const handleFetchedProduct = (product: Product) => {
//   //   console.log('Product fetched:', product);
//   // };

//   return (
//     <>
//       <Navbar/>
//       <div className='container mx-auto flex flex-col items-center justify-center mt-24 px-4'>
//         <div className='w-full max-w-11/12'>
//           {/* Product Form */}
//           <ProductForm onAddProduct={handleAddProduct} />
          
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </div>
//         {/* <ProductDetails product={selectedProduct}/> */}
//         <ProductDetails product={dummy}/>
//       </div>

//       <div className="container mx-auto mt-16">
//         <ProductList products={filteredProducts} />
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
  const [productss, setProductss] = useState<any>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch products from API
  useEffect(()=>{
    console.log(productss);
  },[productss])
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(BASE_URL+'/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data: any = await response.json();
        setProductss(data.products);
        setFilteredProducts(data)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    console.log(selectedProduct)
  }, [selectedProduct])

  const handleAddProduct = (product: Product) => {
    // Check if the product is already in the list
    const isProductInList = productss.some(p => p.id === product.id)
    if (!isProductInList) {
      setProductss(prevProducts => [...prevProducts, product])
      setFilteredProducts(prevFiltered => [...prevFiltered, product])
      setSelectedProduct(product)
      setError(null)
    } else {
      setError('Product is already in the list.')
    }
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handleSearch = (searchTerm: string, minPrice: number, maxPrice: number) => {
    // try {
    //   const filtered = products.filter(product =>
    //     product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //     product.currentPrice >= minPrice &&
    //     (maxPrice === 0 || product.currentPrice <= maxPrice)
    //   )
    //   setFilteredProducts(filtered)
    //   setError(null)
    // } catch (err) {
    //   setError('An error occurred while filtering products.')
    // }
  }

  return (
    <>
      <Navbar/>
      <div className='container mx-auto flex flex-col items-center justify-center mt-24 px-4'>
        <div className='w-full max-w-11/12'>
          {/* Product Form */}
          <ProductForm onAddProduct={handleAddProduct} />
          
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        <ProductDetails product={selectedProduct} />
      </div>

      <div className="container mx-auto mt-16">
        <ProductList products={productss} />
      </div>
    </>
  )
}

export default App
