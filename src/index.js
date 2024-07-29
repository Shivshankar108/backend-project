// require('dotenv').config({path: "./env"})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({  // 
    path: "./env"
})

connectDB()
.then(()=> {
    app.listen(process.env.PORT || 3000, () =>{
        console.log(`Server running on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);  // Exit with an error code
})







/*import express from "express";
const app = express();

;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error", (error) => {
            console.error("MongoDB connection error:", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error: ", error);
    }
})()
*/