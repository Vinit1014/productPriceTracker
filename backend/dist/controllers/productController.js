"use strict";
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
exports.recheckPriceController = exports.getAllProducts = exports.getProductDetails = void 0;
const productService_1 = require("../services/productService");
const Product_1 = __importDefault(require("../models/Product"));
const formatDate = require('../helper/Date');
const getProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const isSpecificProduct = url.includes('pid=') && !url.includes('pr?');
    if (!isSpecificProduct) {
        return res.status(400).json({ error: 'The provided URL does not point to a specific product.' });
    }
    try {
        const productDetails = yield (0, productService_1.scrapeProductDetails)(url);
        console.log(productDetails);
        // Format the current date using the helper function
        const currentDate = formatDate(new Date());
        console.log(currentDate);
        // Check if the product already exists in the database
        const existingProduct = yield Product_1.default.findOne({ title: productDetails.title });
        console.log("Existing one: " + existingProduct);
        if (existingProduct) {
            // Check if there is already a price history record for the current date
            const existingPriceRecord = existingProduct.priceHistory.find((record) => record.date === currentDate);
            if (existingPriceRecord) {
                // If a record for the current date exists, update the price
                existingPriceRecord.price = parseInt(productDetails.price, 10);
            }
            else {
                // If no record for the current date exists, add a new record
                existingProduct.priceHistory.push({
                    date: currentDate,
                    price: parseInt(productDetails.price, 10),
                });
            }
            // Update the current price
            existingProduct.currentPrice = parseInt(productDetails.price, 10);
            // Save the updated product
            yield existingProduct.save();
            // Return the updated product
            return res.json({
                message: 'Product updated successfully',
                product: existingProduct
            });
        }
        else {
            // If the product does not exist, create a new record
            const newProduct = new Product_1.default({
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
            yield newProduct.save();
            // Return the newly created product
            return res.json({
                message: 'Product created successfully',
                product: newProduct
            });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getProductDetails = getProductDetails;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find(); // Fetch all products from the database
        return res.json({
            message: 'Products fetched successfully',
            products
        }); // Send the array of products as the response
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllProducts = getAllProducts;
const recheckPriceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    console.log(productId);
    try {
        const updatedProduct = yield (0, productService_1.recheckProductPrice)(productId);
        return res.status(200).json({ message: 'Price rechecked successfully', product: updatedProduct });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error rechecking price', error: error.message });
    }
});
exports.recheckPriceController = recheckPriceController;
