const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Import the User model
const User = require('./user_model');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: [
        {
            type: ObjectId,
            ref: 'UserModel'
        }
    ],
    comments: [
        {
            commentText: String,
            commentedBy: { type: ObjectId, ref: 'UserModel' }
        }
    ],
    author: {
        type: ObjectId,
        ref: 'UserModel'
    }
});

const Post = mongoose.model('PostModel', postSchema);
module.exports = Post;
