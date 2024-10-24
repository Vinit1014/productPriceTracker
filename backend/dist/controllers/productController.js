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
        const currentDate = formatDate(new Date());
        console.log(currentDate);
        const existingProduct = yield Product_1.default.findOne({ title: productDetails.title });
        console.log("Existing one: " + existingProduct);
        if (existingProduct) {
            const existingPriceRecord = existingProduct.priceHistory.find((record) => record.date === currentDate);
            if (existingPriceRecord) {
                existingPriceRecord.price = parseInt(productDetails.price, 10);
            }
            else {
                existingProduct.priceHistory.push({
                    date: currentDate,
                    price: parseInt(productDetails.price, 10),
                });
            }
            existingProduct.currentPrice = parseInt(productDetails.price, 10);
            yield existingProduct.save();
            // Return the updated product
            return res.json({
                message: 'Product updated successfully',
                product: existingProduct
            });
        }
        else {
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
        const products = yield Product_1.default.find();
        return res.json({
            message: 'Products fetched successfully',
            products
        });
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
