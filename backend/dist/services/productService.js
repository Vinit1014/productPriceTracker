"use strict";
// import * as cheerio from 'cheerio';
// import Product from '../models/Product';
// import { executablePath } from 'puppeteer';
// const puppeteer = require('puppeteer');
// const formatDate = require('../helper/Date');
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recheckProductPrice = exports.scrapeProductDetails = void 0;
// export const scrapeProductDetails = async (url: string) => {
//   try {
//     const browser = await puppeteer.launch();
//     // const browser = await puppeteer.launch({
//     //     executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH  : puppeteer.executablePath(),
//     //     headless: true, 
//     //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         // executablePath: '/usr/bin/google-chrome-stable',
//         // headless: true,
//         // args: [
//         //   '--no-sandbox', 
//         //   '--disable-setuid-sandbox',
//         //   '--disable-dev-shm-usage',
//         //   '--disable-accelerated-2d-canvas',
//         //   '--no-first-run',
//         //   '--no-zygote',
//         //   '--single-process',
//         //   '--disable-gpu'
//         // ]
//     // });
//     const page = await browser.newPage();
//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
//     await page.goto(url, { waitUntil: 'networkidle2' });
//     const html = await page.content();
//     const $ = cheerio.load(html);
//     const title = $('span.VU-ZEz').text().trim();  
//     let description = $('div.Xbd0Sd').text().trim(); 
//     if (description.startsWith("Description")) {
//       description = description.replace("Description", "").trim();
//     }
//     const price = $('div.Nx9bqj.CxhGGd').first().text().replace('₹', '').replace(',', '').trim(); 
//     const reviews = $('div.ipqd2A').first().text().trim(); 
//     const ratings = $('span.Wphh3N').first().text().split(' ')[0].trim();
//     // Log the HTML content
//     // console.log(title);
//     // console.log(description);
//     console.log(price);
//     // console.log(reviews);
//     // console.log(ratings);
//     await browser.close();
//     return {
//       title,
//       description,
//       price,
//       reviews,
//       ratings
//     };
//   } catch (error) {
//       console.error("Error scraping product details:", error);
//       throw error;
//   }  
// };
// export const recheckProductPrice = async (productId: string) => {
//   try {
//     const product = await Product.findById(productId);
//     if (!product) throw new Error('Product not found');
//     const { price: newPrice } = await scrapeProductDetails(product.url);
//     const currentDate = formatDate(new Date());
//     const existingPriceRecord = product.priceHistory.find((record) => record.date === currentDate);
//     if (existingPriceRecord) {
//       existingPriceRecord.price = parseInt(newPrice,10);
//     } else {
//       // If no record for the current date exists, add a new one
//       product.priceHistory.push({
//         date: currentDate,
//         price: parseInt(newPrice,10),
//       });
//     }
//     // Update the current price
//     product.currentPrice = parseInt(newPrice,10);
//     // // Update product with the new price
//     // product.priceHistory.push({ date: currentDate, price: parseInt(newPrice) });
//     // product.currentPrice = parseInt(newPrice);
//     await product.save();
//     return product;
//   } catch (error) {
//     console.error('Error rechecking product price:', error);
//     throw error;
//   }
// };
const cheerio = __importStar(require("cheerio"));
const Product_1 = __importDefault(require("../models/Product"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const formatDate = require('../helper/Date');
const scrapeProductDetails = (url) => __awaiter(void 0, void 0, void 0, function* () {
    let browser = null;
    try {
        console.log('Starting scrape for URL:', url);
        // Comprehensive launch options
        browser = yield puppeteer_core_1.default.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable',
            headless: true,
            timeout: 60000, // Increased timeout
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ],
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        });
        console.log('Browser launched successfully');
        const page = yield browser.newPage();
        // Enhanced page setup
        yield page.setDefaultTimeout(30000);
        yield page.setDefaultNavigationTimeout(30000);
        yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        console.log('Navigating to URL:', url);
        try {
            yield page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });
        }
        catch (navigationError) {
            console.error('Navigation Error:', navigationError);
            throw new Error(`Failed to navigate to ${url}: ${navigationError.message}`);
        }
        // Take screenshot for debugging (optional)
        // await page.screenshot({ path: 'page.png' });
        const html = yield page.content();
        console.log('Page content length:', html.length);
        const $ = cheerio.load(html);
        // Comprehensive selector logging
        const title = $('span.VU-ZEz').text().trim();
        console.log('Title selector result:', title);
        let description = $('div.Xbd0Sd').text().trim();
        console.log('Description selector result:', description);
        if (description.startsWith("Description")) {
            description = description.replace("Description", "").trim();
        }
        const price = $('div.Nx9bqj.CxhGGd').first().text().replace('₹', '').replace(',', '').trim();
        console.log('Price selector result:', price);
        const reviews = $('div.ipqd2A').first().text().trim();
        console.log('Reviews selector result:', reviews);
        const ratings = $('span.Wphh3N').first().text().split(' ')[0].trim();
        console.log('Ratings selector result:', ratings);
        // Validation checks
        if (!price) {
            throw new Error('Unable to extract price');
        }
        return {
            title,
            description,
            price,
            reviews,
            ratings
        };
    }
    catch (error) {
        console.error("Comprehensive Scraping Error:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            url: url
        });
        throw error;
    }
    finally {
        if (browser) {
            try {
                yield browser.close();
                console.log('Browser closed successfully');
            }
            catch (closeError) {
                console.error('Error closing browser:', closeError);
            }
        }
    }
});
exports.scrapeProductDetails = scrapeProductDetails;
const recheckProductPrice = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Rechecking price for product ID:', productId);
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            console.error('Product not found with ID:', productId);
            throw new Error('Product not found');
        }
        console.log('Product URL:', product.url);
        const { price: newPrice } = yield (0, exports.scrapeProductDetails)(product.url);
        const currentDate = formatDate(new Date());
        const existingPriceRecord = product.priceHistory.find((record) => record.date === currentDate);
        if (existingPriceRecord) {
            existingPriceRecord.price = parseInt(newPrice, 10);
        }
        else {
            product.priceHistory.push({
                date: currentDate,
                price: parseInt(newPrice, 10),
            });
        }
        product.currentPrice = parseInt(newPrice, 10);
        yield product.save();
        console.log('Product price updated successfully');
        return product;
    }
    catch (error) {
        console.error('Comprehensive Price Recheck Error:', {
            message: error.message,
            stack: error.stack,
            productId: productId
        });
        throw error;
    }
});
exports.recheckProductPrice = recheckProductPrice;
