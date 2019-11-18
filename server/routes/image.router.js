const express = require('express');
require('dotenv').config();
const pool = require('../modules/pool');
const axios = require('axios');


const router = express.Router();
// query giphy API
router.get('/:search', (req, res) => {
    console.log(req.params);
    axios({
        method: 'GET',
        url: 'https://pixabay.com/api/',
        params: {
            key: process.env.PIXABAY_API_KEY,
            q: req.params.search,
            orientation: 'vertical',
            order: 'popular'
        }
    }).then( (result) => {
        res.send(result.data);
        console.log(result.data);
    })
    .catch(error => {
        console.log('error in api GETTER', error);
    })
});

module.exports = router;
