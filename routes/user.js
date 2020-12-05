const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userMODEL.js');

router.post('/signup', function(req, res, next){
    
    User.find({ email: req.body.email})
        .exec()
        .then(function(user){
            if(user.length >=1)
            {
                return res.status(409).json({
                    message: 'user with same mail exists'
                });

            }
            else
            {
                bcrypt.hash(req.body.password, 10, function( err, hash){
                    if(err)
                    {
                        return res.status(500).json({
                            error: err
                        });
        
                    }
                    else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                        .then(function(doc){
                            console.log(doc);
                            res.status(201).json({
                                message: 'User was created'
                            });
                        })
                        .catch(function(err){
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                        
                    }
                
        
                });
            }
        });
        
    
    

});



router.post('/login', function(req, res, next){
    User.find({ email: req.body.email})
        .exec()
        .then(function(user){
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });

            }
            else{
                bcrypt.compare(req.body.password, user[0].password, function(err, result){
                    if(err){
                     return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if(result){
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                            },
                            "secret", 
                            {
                            expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth succesful',
                            token: token
                        });
                    }
                    else{
                        return res.status(401).json({
                            message: 'Auth failed'
                            
                        });
                    }


                })

            }
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
           
        });
});

router.delete('/:userId', function(req, res, next){
    User.remove({_id: req.params.userId})
        .exec()
        .then(function(result){
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;