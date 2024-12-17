const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;

app.use(cors()); // Enable CORS

// MongoDB connection
const URL_MONGO = "mongodb+srv://myappuser:sMjQJT5Y5Ui2LhoJ@cluster0.mpaikjr.mongodb.net/test";

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
