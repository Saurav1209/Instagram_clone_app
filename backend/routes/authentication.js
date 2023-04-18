const express = require('express') ;
const router = express.Router() ;
const mongoose = require('mongoose') ;
const UserModel = mongoose.model("UserModel") ;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken') ;
const {JWT_SECRET} = require('../config') ;

const protectedResource = require('../middleware/protectedResource');


router.get('/', (req, res)=>{
    res.send("welcome to mern course!") ;
} ) ;

router.get('/secured',protectedResource, (req, res)=>{
    res.send("welcome to secured area! ") ;
} ) ;

router.post('/login',(req, res)=>{
    const{ email, password} = req.body ;
    if( !password|| !email){
        return res.status(400).json({error: "one or more mandatory field is empty"});
    }
    UserModel.findOne({email: email})
    .then((dbUser) =>{
        if(!dbUser){
           return res.status(400).json({error: "User does not exist"});
        }
        bcrypt.compare(password, dbUser.password)
        .then((didMatch) =>{
            if(didMatch){
                // res.status(200).json({result: "User logged in Successfully"});
                //create token 
                const jwtToken = jwt.sign({_id: dbUser._id}, JWT_SECRET) ;
                 const{_id, fullName, email} = dbUser ;
                res.json({token: jwtToken, userInfo: {_id, fullName, email}}) ;

            }
            else{
              return res.status(400).json({error: "Invalid Credentials"});

            }
        });
    })
    .catch((error)=>{
        console.log(error);
    });
    
    
})

router.post('/register',(req, res)=>{
    console.log(req.body);
    const{fullName, email, password} = req.body ;
    if(!fullName || !password|| !email){
        return res.status(400).json({error: "one or more mandatory field is empty"});
    }

    //avoid duplicate 
    UserModel.findOne({email: email})
    .then((dbUser) =>{
        if(dbUser){
            return res.status(500).json({error: "user with email id already exist"});

        }
        bcrypt.hash(password, 16)
              .then((hashedPassword) => {
                      const user = new UserModel({fullName, email, password :hashedPassword});
                      user.save()
                      .then((u)=>{
                          res.status(201).json({result: "User Registered Successfully "});
                      })
                      .catch((error)=>{
                          console.log(error);
                      });
                 })
      

       
    }) 
    .catch((error)=>{
        console.log(error);
    });
    
   
});

module.exports = router;