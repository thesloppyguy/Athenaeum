//A route that would only allow registered users to access their file system 
// and open PDF and edit and leave comments.


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Middleware to check if the user is authenticated and is a registered user with a valid token
const checkAuth = require('../middleware/check-auth');


router.get('/',checkAuth,function(req,res,next){
    res.status(200).json({"user":req.headers.authorization});
});

module.exports = router;