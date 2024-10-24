import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  url: string,
  title: string;
  description: string;
  currentPrice: number;
  reviews: number;
  totalRatings: string;
  priceHistory: {
    date: string;
    price: number;
  }[];
}

const ProductSchema: Schema<IProduct> = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  reviews: { type: Number, required: true },
  totalRatings: { type: String, required: true },
  priceHistory: [
    {
      date: { type: String, required: true }, 
      price: { type: Number, required: true }
    }
  ]
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
