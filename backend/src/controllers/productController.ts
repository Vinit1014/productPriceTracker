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
    console.log(productDetails);
    
    // Format the current date using the helper function
    const currentDate = formatDate(new Date());
    console.log(currentDate);
    
    // Check if the product already exists in the database
    const existingProduct = await Product.findOne({ title: productDetails.title });
    console.log("Existing one: " + existingProduct);
    
    if (existingProduct) {
      // Check if there is already a price history record for the current date
      const existingPriceRecord = existingProduct.priceHistory.find((record) => record.date === currentDate);
  
      if (existingPriceRecord) {
        // If a record for the current date exists, update the price
        existingPriceRecord.price = parseInt(productDetails.price, 10);
      } else {
        // If no record for the current date exists, add a new record
        existingProduct.priceHistory.push({
          date: currentDate,
          price: parseInt(productDetails.price, 10),
        });
      }
      
      // Update the current price
      existingProduct.currentPrice = parseInt(productDetails.price, 10);
    
      // Save the updated product
      await existingProduct.save();

      // Return the updated product
      return res.json({
        message: 'Product updated successfully',
        product: existingProduct
      });
    } else {
      // If the product does not exist, create a new record
      const newProduct = new Product({
        url: url,
        title: productDetails.title,  
        description: productDetails.description,
        currentPrice: parseInt(productDetails.price, 10),
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

      // Return the newly created product
      return res.json({
        message: 'Product created successfully',
        product: newProduct
      });
    }
    
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    return res.json({
      message: 'Products fetched successfully',
      products
    }); // Send the array of products as the response
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
