const express = require('express');
require('dotenv').config();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');


const router = express.Router();
// query Unsplash API
router.get('/:search', rejectUnauthenticated, (req, res) => {
    console.log(req.params);
    axios({
        method: 'GET',
        url: 'https://api.unsplash.com/search/photos/',
        params: {
            client_id: process.env.UNSPLASH_API_ACCESS_KEY,
            query: req.params.search,
            orientation: 'portrait',
            w: 1000,
            h: 1000
        }
    }).then( (result) => {
        res.send(result.data.results);
        // console.log(result.data.results);
    })
    .catch(error => {
        console.log('error in api GETTER', error);
    })
});

module.exports = router;
