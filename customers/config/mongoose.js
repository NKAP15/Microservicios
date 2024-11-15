const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const db = await mongoose.connect("mongodb://localhost/clientes");
      console.log(`connected to mongoDb ${mongoose.connection.host}`);
    } catch (error) {
      console.log(`MongoDB Error ${error}`);
    }
  };

  module.exports = connectDB;