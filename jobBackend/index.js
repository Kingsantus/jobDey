const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/dbConfig');
const authRoute=require("./routes/auth");
const jobRoute = require("./routes/job");
const userRoute = require("./routes/user");
const cookieparser = require('cookie-parser');
const { errorHandler, CustomError } = require("./middlewares/error");

dotenv.config()

// initializing exress to app
const app = express();

// allowing app to accept json
app.use(express.json());

// Allow the app to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// allowing only the fronend site access the api
app.use(cors({
  origin: 'https://jobdey-ase4.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.options('*', cors());

// allowing cookie to be parsed between frontend and backend
app.use(cookieparser())

const port = process.env.PORT || 5000;

// use routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/post",jobRoute);
app.use("/api/v1/user",userRoute);

// instantiating errorHandler to app
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Welcome to Job dey")
})

app.listen(port, () => {
    connectDB();
    console.log("Connected successfully")
});
