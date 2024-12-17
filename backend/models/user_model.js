const mongoose = require('mongoose') ;
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required :true
         
    },
    email:{
        type: String,
        required :true
    },
    password :{
        type: String,
        required :true
    }
})  ;

// mongoose.model("UserModel", userSchema) ;
const User = mongoose.model("UserModel", userSchema);
module.exports = User;