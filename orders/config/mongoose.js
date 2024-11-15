const mongoose = require('mongoose')

const connectDB = async () => {
    try {
      const db = await mongoose.connect("mongodb://localhost/ordenes");
      console.log(`Conectado a Mongo db ${mongoose.connection.host}`);
    } catch (error) {
      console.log(`MongoDB Error ${error}`);
    }
  };

  module.exports = connectDB;