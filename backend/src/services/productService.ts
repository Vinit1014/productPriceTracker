import * as cheerio from 'cheerio';
import Product from '../models/Product';
const puppeteer = require('puppeteer');
const formatDate = require('../helper/Date');

export const scrapeProductDetails = async (url: string) => {

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH  : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

    await page.goto(url);

    const html = await page.content();
    
    const $ = cheerio.load(html);
    const title = $('span.VU-ZEz').text().trim();  
    let description = $('div.Xbd0Sd').text().trim(); 
    if (description.startsWith("Description")) {
      description = description.replace("Description", "").trim();
    }
    const price = $('div.Nx9bqj.CxhGGd').first().text().replace('₹', '').replace(',', '').trim(); 
    const reviews = $('div.ipqd2A').first().text().trim(); 
    const ratings = $('span.Wphh3N').first().text().split(' ')[0].trim();

    // console.log(price);
    
    return {
      title,
      description,
      price,
      reviews,
      ratings
    };
  } catch (error) {
      console.error("Error scraping product details:", error);
      throw error;
  }  finally {
    await browser.close();
  }
};


export const recheckProductPrice = async (productId: string) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    const { price: newPrice } = await scrapeProductDetails(product.url);

    const currentDate = formatDate(new Date());

    const existingPriceRecord = product.priceHistory.find((record) => record.date === currentDate);

    if (existingPriceRecord) {
      existingPriceRecord.price = parseInt(newPrice.replace(/,/g, ""), 10);
    } else {
      // If no record for the current date exists, add a new one
      product.priceHistory.push({
        date: currentDate,
        price: parseInt(newPrice.replace(/,/g, ""), 10),
      });
    }

    // Update the current price
    product.currentPrice = parseInt(newPrice.replace(/,/g, ""), 10);

    // // Update product with the new price
    // product.priceHistory.push({ date: currentDate, price: parseInt(newPrice) });
    // product.currentPrice = parseInt(newPrice);

    await product.save();
    return product;
  } catch (error) {
    console.error('Error rechecking product price:', error);
    throw error;
  }
};
