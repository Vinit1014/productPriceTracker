import { Router } from 'express';
const { getProductDetails, getAllProducts } = require('../controllers/productController');

const router = Router();

router.post('/product', getProductDetails);
router.get('/products', getAllProducts);

export default router;
