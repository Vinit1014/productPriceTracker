
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    console.log('MongoDB URL:', process.env.MONGODB_URL);
    console.log('Current IP:', await getPublicIP());
    
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4 // Force IPv4
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

async function getPublicIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Could not fetch public IP:', error);
    return 'IP_FETCH_FAILED';
  }
}

module.exports = dbConnect;

