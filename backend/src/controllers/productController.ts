import { Request, Response } from 'express';
import { recheckProductPrice, scrapeProductDetails } from '../services/productService';
import Product from '../models/Product';
const formatDate = require('../helper/Date');

export const getProductDetails = async (req: Request, res: Response): Promise<Response> => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const isSpecificProduct = url.includes('pid=') && !url.includes('pr?');
  if (!isSpecificProduct) {
    return res.status(400).json({ error: 'The provided URL does not point to a specific product.' });
  }

  try {
    const productDetails = await scrapeProductDetails(url);
    // console.log(productDetails);
    
    const currentDate = formatDate(new Date());
    // console.log(currentDate);
    
    const existingProduct = await Product.findOne({ title: productDetails.title });
    // console.log("Existing one: " + existingProduct);
    
    if (existingProduct) {
      const existingPriceRecord = existingProduct.priceHistory.find((record) => record.date === currentDate);
  
      if (existingPriceRecord) {
        existingPriceRecord.price = parseInt(productDetails.price.replace(/,/g, ""), 10);
      } else {
        existingProduct.priceHistory.push({
          date: currentDate,
          price: parseInt(productDetails.price.replace(/,/g, ""), 10),
        });
      }
      
      existingProduct.currentPrice = parseInt(productDetails.price.replace(/,/g, ""), 10);

      await existingProduct.save();

      // Return the updated product
      return res.json({
        message: 'Product updated successfully',
        product: existingProduct
      });
    } else {
      // console.log("Inside else clause");
      
      const newProduct = new Product({
        url: url,
        title: productDetails.title,  
        description: productDetails.description,
        currentPrice: parseInt(productDetails.price.replace(/,/g, ""), 10),
        reviews: productDetails.reviews,
        totalRatings: productDetails.ratings,
        priceHistory: [
          {
            date: currentDate,
            price: parseInt(productDetails.price, 10),
          }
        ],
      });
      await newProduct.save();

      return res.json({
        message: 'Product created successfully',
        product: newProduct
      });
    }
    
  } catch (error: any) {
    console.log("Inside pC "+error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await Product.find(); 
    return res.json({
      message: 'Products fetched successfully',
      products
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const recheckPriceController = async (req: Request, res: Response):Promise<Response> => {
  const { productId } = req.params;
  console.log(productId);
  try {
    const updatedProduct = await recheckProductPrice(productId);
    return res.status(200).json({ message: 'Price rechecked successfully', product: updatedProduct });
  } catch (error:any) {
    return res.status(500).json({ message: 'Error rechecking price', error: error.message });
  }
};
