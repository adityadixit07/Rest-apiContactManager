const mongoose = require("mongoose");



const connectToDatabase=async()=>{
    const CONNECTION_STRING="mongodb+srv://adityadixit:jx7BGskvb04o6VAj@cluster0.b7dm0gb.mongodb.net/?retryWrites=true&w=majorit";
    console.log("connected to database",mongoose.connection.host,mongoose.connection.id);
    return mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  }
  
  module.exports = connectToDatabase;
