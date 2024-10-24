"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getProductDetails, getAllProducts, recheckPriceController } = require('../controllers/productController');
const router = (0, express_1.Router)();
router.post('/product', getProductDetails);
router.get('/products', getAllProducts);
router.put('/products/:productId', recheckPriceController);
exports.default = router;
