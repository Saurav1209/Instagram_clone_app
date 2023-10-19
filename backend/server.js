const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const PORT = 5000 ;
const cors = require('cors');
app.use(cors());
//  const{MONGODB_URI} = require('./config') ;
const URL_MONGO="mongodb+srv://myappuser:sMjQJT5Y5Ui2LhoJ@cluster0.mpaikjr.mongodb.net/test"

mongoose.connect(URL_MONGO) ;

mongoose.connection.on('connected', ()=> {
    console.log("connected") ;
});
mongoose.connection.on('error', (error)=> {
    console.log("Some Error", error) ;
});

require('./models/user_model.js');
require('./models/post_model.js');

app.use(express.json());
app.use(require('./routes/authentication.js'));
app.use(require('./routes/postroute.js'));

app.listen(PORT, ()=> {
    console.log("server started") ;
});