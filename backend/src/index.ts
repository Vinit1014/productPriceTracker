import express from 'express';
import productRoutes from './routes/productRoutes';
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');

dotenv.config();
dbConnect();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', productRoutes);

app.get('/',(req,res)=>{
  console.log("Working");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
