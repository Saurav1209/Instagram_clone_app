const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000; // Default to 3000 if PORT is undefined
const jwtSecret = process.env.JWT_SECRET_KEY;
const URL_MONGO = process.env.MONGODB_URI;

const allowedOrigins = ['http://localhost:3000', 'https://insta-snap-two.vercel.app'];

// Use CORS middleware to allow requests from the specified origins
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'), false);  // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // You can specify allowed methods
  credentials: true,  // Allow credentials if necessary (cookies, authentication)
}));

mongoose.connect(URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected successfully!");
});

mongoose.connection.on('error', (error) => {
    console.log("Error connecting to MongoDB:", error);
});

// Basic route for testing
app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

// Middleware for parsing JSON
app.use(express.json());

// Import models
require('./models/user_model');
require('./models/post_model');

// // Use authentication and post routes
app.use(require('./routes/authentication'));
app.use(require('./routes/postroute'));

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
