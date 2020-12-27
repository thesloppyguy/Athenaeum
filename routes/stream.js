const express = require('express');
const router = express.Router();
//importing media-server
//const node_media_server = require('../middleware/media-server');


router.get('/info',function(req, res, next){
    if(req.query.streams){
        let streams = JSON.parse(req.query.streams);
        let query = {$or: []};
        for (let stream in streams){
            if(!streams.hasOwnProperty(stream)) continue;
            query.$or.push({stream_key : stream});
        }
    }
});

//node_media_server.run();

module.exports = router;