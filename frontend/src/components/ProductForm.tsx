// import React, { useState } from 'react'
// import { Product } from '../types'

// interface ProductFormProps {
//   onAddProduct: (product: Product) => void
//   onError: (error: string) => void
// }

// const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct, onError }) => {
//     const [url, setUrl] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//         const response = await fetch('/api/product', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ url })
//         })

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const product = await response.json();
//         onAddProduct(product)
//         setUrl('')
//         } catch (error) {
//         console.error('Error fetching product details:', error)
//         onError('Failed to fetch product details. Please try again.')
//         } finally {
//         setLoading(false)
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className="mb-6">
//             <div className="flex gap-2">
//                 <input
//                 type="url"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 placeholder="Paste Flipkart product URL here"
//                 required
//                 className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                 >
//                 {loading ? 'Fetching...' : 'Fetch Details'}
//                 </button>
//             </div>
//         </form>
//     )
// }

// export default ProductForm

import React, { useState } from 'react';
import { Product } from '../types';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const product = await response.json();
      onAddProduct(product);     // Try to add product to list
      setUrl('');
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Flipkart product URL here"
          required
          className="flex-grow px-4 md:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Fetching...' : 'Fetch Details'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
