import React, { useState } from 'react'
import { SearchX } from 'lucide-react'


interface SearchAndFilterProps {
  onSearch: (searchTerm: string) => void
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')
    // const [minPrice, setMinPrice] = useState('')
    // const [maxPrice, setMaxPrice] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(searchTerm);
    }

    const cancelSearch = ()=>{
        setSearchTerm('');
        onSearch('');
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <div className="flex items-center">
                <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by title..."
                className="block w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <SearchX className='hover:cursor-pointer' onClick={cancelSearch}/>
            
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                Search
            </button>
        </form>
    )
}

export default SearchAndFilter

{/* <div className="flex items-center space-x-2">
    <div className="flex-1">
    <label htmlFor="minPrice" className="sr-only">Min Price</label>
    <input
        id="minPrice"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min Price"
        min="0"
        className="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
    </div>
    
    <div className="flex-1">
    <label htmlFor="maxPrice" className="sr-only">Max Price</label>
    <input
        id="maxPrice"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
        min="0"
        className="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
    </div>
</div> */}