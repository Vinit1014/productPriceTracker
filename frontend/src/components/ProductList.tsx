import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const handleRecheckPrice = (id: string) => {
    console.log(`Rechecking price for product: ${id}`);
  };

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found. Try adding a product or adjusting your search.</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">List of Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} onRecheckPrice={handleRecheckPrice} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
