const express = require('express');
require('dotenv').config();
const pool = require('../modules/pool');
const axios = require('axios');


const router = express.Router();

// fetch route to Yandex Translate API
router.get('/:lang/:text', (req, res) => {
    axios({
        method: 'GET',
        url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        params: {
            key: process.env.YANDEX_API_KEY,
            text: req.params.text,
            lang: req.params.lang,
        }
    }).then( (result) => {
        console.log(result.data);
        res.send(result.data);
    })
    .catch(error => {
        console.log('error in api/translate GETTER', error);
    })
});

module.exports = router;
