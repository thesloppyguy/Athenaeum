const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
//test
console.log(process.env.MONGO_ATLAS_PW);

const userRoutes = require('../routes/user');
const fileRoutes = require('../routes/file');
const streamRoutes = require('../routes/stream');
const settingsRoutes = require('../routes/settings');
//thumbnail generator
const thumbnail_generator = require('./cron/thumbnail');
//importing media-server
const node_media_server = require('../middleware/media-server');



//mongoose.connect("mongodb+srv://acharya-user:pass@acharya-proj.yexwh.mongodb.net/acharya-proj?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}, function(err){ console.log("connected to database!")});
mongoose.connect("mongodb+srv://"+ process.env.MONGO_ATLAS_USER +":"+ process.env.MONGO_ATLAS_PW +"@acharya-proj.yexwh.mongodb.net/"+ process.env.MONGO_ATLAS_DBNAME +"?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}, function(err){ console.log("connected to database!")});
mongoose.Promise = global.Promise;

//code to set the view engine (ejs in this case)


app.set('views', path.join(__dirname,'./views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'../public')));

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
app.use('/pdf',fileRoutes);
app.use('/stream',streamRoutes);
app.use('/settings', settingsRoutes);


app.get('*', function(req, res, next){
    res.render('index');
});

node_media_server.run();

thumbnail_generator.start();

module.exports = app;