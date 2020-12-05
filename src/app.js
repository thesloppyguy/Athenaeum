const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('../routes/user');



//mongoose.connect("mongodb+srv://acharya-user:pass@acharya-proj.yexwh.mongodb.net/acharya-proj?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}, function(err){ console.log("connected to database!")});
mongoose.connect("mongodb+srv://"+ process.env.MONGO_ATLAS_USER +":"+ process.env.MONGO_ATLAS_PW +"@acharya-proj.yexwh.mongodb.net/"+ process.env.MONGO_ATLAS_DBNAME +"?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}, function(err){ console.log("connected to database!")});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


// the code bellow helps us avoid a CORS error!!
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods',"PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
    next();

});
app.use('/users',userRoutes);

app.get('/', function(req, res, next){
    res.status(200).json({"E-learn":"Fury"});
});

module.exports = app;