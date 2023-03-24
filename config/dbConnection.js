require('dotenv').config();
const mongoose = require("mongoose");
const mongo_url=process.env.CONNECTION_STRING
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongo_url);
    console.log(
      "connection established to the database..",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
