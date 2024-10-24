import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onRecheckPrice: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRecheckPrice, loading, error }) => {
  const characterLimit = 300;
  
  const truncatedDescription =
    product.description.length > characterLimit
      ? product.description.slice(0, characterLimit) + '...'
      : product.description;

  return (
    <div className="border rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">{truncatedDescription}</p>
      <p className="font-bold mb-2">Current Price: ₹{product.currentPrice}</p>
      <p className="mb-2">Reviews: {product.reviews}/5</p>
      <p className="mb-4">Total Purchases: {product.totalRatings}</p>
      <h3 className="font-semibold mb-2">Price History</h3>
      <ul className="space-y-1">
        {product.priceHistory.map((item, index) => (
          <li key={index} className="text-sm">
            {new Date(item.date).toLocaleDateString()}: ₹{item.price}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onRecheckPrice(product._id)}
        disabled={loading}
        className={`mt-4 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
        }`}
      >
        {loading ? 'Rechecking...' : 'Recheck Price'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ProductCard;
