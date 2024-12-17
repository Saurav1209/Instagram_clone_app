const jwt = require('jsonwebtoken') ;
const {JWT_SECRET} = require('../config') ;

const mongoose = require('mongoose') ;
// const UserModel = mongoose.model("UserModel") ;
const UserModel = require('../models/user_model');
module.exports = (req, res, next) => {
    // Extract the authorization header
    const { authorization } = req.headers;
    console.log("Authorization Header:", authorization);

    if (!authorization) {
        console.log("No authorization header found.");
        return res.status(402).json({ error: "User not logged in..." });
    }

    // Extract the token from the header
    const token = authorization.replace("Bearer ", "");
    console.log("Extracted Token:", token);

    // Verify the token
    jwt.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
            console.log("JWT verification failed:", error);
            return res.status(403).json({ error: "User not logged in.." });
        }

        // Extract user ID from the payload
        const { _id } = payload;
        console.log("User ID extracted from token:", _id);

        // Find the user in the database
        UserModel.findById(_id)
            .then(dbUser => {
                if (!dbUser) {
                    console.log("User not found in the database.");
                    return res.status(404).json({ error: "User not found." });
                }
                console.log("User found:", dbUser);
                req.dbUser = dbUser;
                next(); // Pass the request to the next middleware or route handler
            })
            .catch(err => {
                console.log("Error finding user:", err);
                return res.status(500).json({ error: "Internal server error." });
            });
    });
};
