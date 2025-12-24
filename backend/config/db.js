const mongoose = require('mongoose');

const connectDb = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/hisobchi';

  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not set; defaulting to local mongodb://localhost:27017/hisobchi');
  }

  try {
    await mongoose.connect(uri, {
      autoIndex: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
