const express = require('express');
require('dotenv').config();
const pool = require('../modules/pool');
const axios = require('axios');


const router = express.Router();
// query Unsplash API
router.get('/:search', (req, res) => {
    console.log(req.params);
    axios({
        method: 'GET',
        url: 'https://api.unsplash.com/search/photos/',
        params: {
            client_id: process.env.UNSPLASH_API_ACCESS_KEY,
            query: req.params.search,
            orientation: 'portrait',
        }
    }).then( (result) => {
        res.send(result.data.results);
        console.log(result.data.results);
    })
    .catch(error => {
        console.log('error in api GETTER', error);
    })
});

module.exports = router;
