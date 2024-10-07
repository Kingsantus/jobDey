const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/dbConfig');

dotenv.config()

// initializing exress to app
const app = express();

// allowing app to accept json
app.use(express.json());

// allowing other site access the api
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Job dey")
})

app.listen(port, () => {
    connectDB();
    console.log("Connected successfully")
});