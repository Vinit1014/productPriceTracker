"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getProductDetails, getAllProducts } = require('../controllers/productController');
const router = (0, express_1.Router)();
router.post('/product', getProductDetails);
router.get('/products', getAllProducts);
exports.default = router;
