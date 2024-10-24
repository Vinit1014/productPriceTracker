import React from 'react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product | null;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
        <div className='w-full max-w-11/12 p-6 mt-6 border rounded-lg bg-white shadow-md'>
            {product ? (
                <div>
                    <h2 className="text-2xl font-bold">{product.title}</h2>
                    <p className="mt-2">{product.description}</p>
                    <p className="font-bold text-xl mt-4">Price: ₹{product.currentPrice}</p>
                    <p className="mt-2">Reviews: {product.reviews}/5</p>
                    <p className="mt-2">Total Purchases: {product.totalRatings}</p>
                    <h3 className="font-semibold mt-6">Price History</h3>
                    <ul className="mt-2">
                        {product.priceHistory.map((item, index) => (
                        <li key={index}>
                            {new Date(item.date).toLocaleDateString()}: ₹{item.price}
                        </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="font-bold text-red-500 text-center">No product fetched. Try to fetch details of any product by entering URL of any product and clicking on "Fetch details"</p>
            )}
        </div>
    );
};

export default ProductDetails;
