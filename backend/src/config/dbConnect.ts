
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URL, {
    await mongoose.connect('mongodb+srv://v1n1ts0010:lH1KmWhuLRy9pS5u@pricetracker.0av8v.mongodb.net/?retryWrites=true&w=majority&appName=priceTracker', {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = dbConnect;