const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();// Load environment variables from .env file

const mongoURI = process.env.MONGO_URI;
const connectDB = () => {
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'Error connecting to MongoDB :'));
  db.once('open', () => {
    console.log('Database connected');
  });
};
  module.exports = connectDB;