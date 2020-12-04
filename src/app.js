const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//require('dotenv').config;


mongoose.connect('mongodb+srv://acharya-user:acharya@cluster0.vtknj.mongodb.net/Cluster0?retryWrites=true&w=majority',{ useNewUrlParser: true ,  useUnifiedTopology: true  });
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

app.get('/', function(req, res, next){
    res.status(200).json({"E-learn":"Fury"});
});

module.exports = app;