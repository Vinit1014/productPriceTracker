import React, {useState} from 'react'
import SearchAndFilter from './SearchAndFilter'
import { Product } from '../types'
const Navbar = () => {
    const [products, setProducts] = useState<Product[] | undefined>(undefined)
    const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>(undefined)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = (searchTerm: string, minPrice: number, maxPrice: number) => {
        // try {
        //   if (!products) return
    
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
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-md'> 
            <h2 className='text-xl font-medium text-slate-700 py-2'>Price Tracker</h2>
            <SearchAndFilter onSearch={handleSearch}/>
        </div>
    )
}

export default Navbar
