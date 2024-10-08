const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/dbConfig');
const authRoute=require("./routes/auth");
const { errorHandler, CustomError } = require("./middlewares/error");

dotenv.config()

// initializing exress to app
const app = express();

// allowing app to accept json
app.use(express.json());

// Allow the app to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// allowing other site access the api
app.use(cors());

const port = process.env.PORT || 5000;

// use routes
app.use("/api/v1/auth",authRoute);

// instantiating errorHandler to app
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Welcome to Job dey")
})

app.listen(port, () => {
    connectDB();
    console.log("Connected successfully")
});