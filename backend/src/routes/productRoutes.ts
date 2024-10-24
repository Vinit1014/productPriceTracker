import { Router } from 'express';

const { getProductDetails, getAllProducts, recheckPriceController } = require('../controllers/productController');

const router = Router();

router.post('/product', getProductDetails);
router.get('/products', getAllProducts);
router.put('/products/:productId', recheckPriceController);

export default router;
