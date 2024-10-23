"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
dotenv.config();
dbConnect();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use('/api', productRoutes_1.default);
app.get('/', (req, res) => {
    console.log("Working");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
