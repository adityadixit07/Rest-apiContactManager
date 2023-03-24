// console.log("Contact manager rest API")
require('dotenv').config();
const express=require("express");
const connectDB = require('./config/dbConnection');

const errorHandler = require("./middleware/ErrorHandler");

connectDB();

const app=express();
const PORT=process.env.PORT||3000;

app.use(express.json()); //provide json format data


app.use("/api/contacts",require("./Routes/contactRoutes"))

app.use("/api/users",require("./Routes/UserRoutes"))


app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

