import React from 'react'
import SearchAndFilter from './SearchAndFilter'

interface NavbarProps {
    onSearch: (searchTerm: string) => void;
}
  
const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-md'> 
            <h2 className='text-xl font-medium text-slate-700 py-2'>Price Tracker</h2>
            <SearchAndFilter onSearch={onSearch}/>
        </div>
    )
}

export default Navbar
