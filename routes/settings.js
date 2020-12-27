const express = require('express');
const router = express.Router();



router.get('/stream_key', (req, res) =>{
    res.json({
        stream_key : 12345678
    });
});


router.post('/stream_key', (req, res) => {
    res.json({
        stream_key: Math.floor(1234568 + Math.random()*10)
    });
});

module.exports = router;