const jwt = require('jsonwebtoken') ;
const {JWT_SECRET} = require('../config') ;

const mongoose = require('mongoose') ;
// const UserModel = mongoose.model("UserModel") ;
const UserModel = require('../models/user_model');
module.exports = (req, res, next) => {
    //authorization  -> bearer token
    const{authorization} = req.headers ;
    if(!authorization) {
        return res.status(401).json({error: "user not logged in."}) ;

    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (error, payload) =>{
        if(error){
        
          return res.status(401).json({error: "user not logged in."}) ;

        }
        const{_id} = payload ;
        UserModel .findById(_id)
        .then(dbUser =>{
            req.dbUser = dbUser ;
            next() ;
        });
        //forward rreq to nxt middleware or to next route 
       

    } );
}