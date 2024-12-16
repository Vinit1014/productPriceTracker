"use strict";
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
const cheerio = __importStar(require("cheerio"));
const Product_1 = __importDefault(require("../models/Product"));
const puppeteer = require('puppeteer');
const formatDate = require('../helper/Date');
const scrapeProductDetails = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer.launch({
            executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = yield browser.newPage();
        yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
        yield page.goto(url, { waitUntil: 'networkidle2' });
        const html = yield page.content();
        const $ = cheerio.load(html);
        const title = $('span.VU-ZEz').text().trim();
        let description = $('div.Xbd0Sd').text().trim();
        if (description.startsWith("Description")) {
            description = description.replace("Description", "").trim();
        }
        const price = $('div.Nx9bqj.CxhGGd').first().text().replace('₹', '').replace(',', '').trim();
        const reviews = $('div.ipqd2A').first().text().trim();
        const ratings = $('span.Wphh3N').first().text().split(' ')[0].trim();
        // Log the HTML content
        // console.log(title);
        // console.log(description);
        console.log(price);
        // console.log(reviews);
        // console.log(ratings);
        yield browser.close();
        return {
            title,
            description,
            price,
            reviews,
            ratings
        };
    }
    catch (error) {
        console.error("Error scraping product details:", error);
        throw error;
    }
});
exports.scrapeProductDetails = scrapeProductDetails;
const recheckProductPrice = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(productId);
        if (!product)
            throw new Error('Product not found');
        const { price: newPrice } = yield (0, exports.scrapeProductDetails)(product.url);
        const currentDate = formatDate(new Date());
        const existingPriceRecord = product.priceHistory.find((record) => record.date === currentDate);
        if (existingPriceRecord) {
            existingPriceRecord.price = parseInt(newPrice, 10);
        }
        else {
            // If no record for the current date exists, add a new one
            product.priceHistory.push({
                date: currentDate,
                price: parseInt(newPrice, 10),
            });
        }
        // Update the current price
        product.currentPrice = parseInt(newPrice, 10);
        // // Update product with the new price
        // product.priceHistory.push({ date: currentDate, price: parseInt(newPrice) });
        // product.currentPrice = parseInt(newPrice);
        yield product.save();
        return product;
    }
    catch (error) {
        console.error('Error rechecking product price:', error);
        throw error;
    }
});
exports.recheckProductPrice = recheckProductPrice;
