const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');


const router = express.Router();

// fetch route to Yandex Translate API
router.get('/:lang/:text', rejectUnauthenticated, (req, res) => {
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

// queries DB to check if ENGLISH word is already present
// en parameter specifies this word to English
// search param is the word to search
router.get('/checkDB/en-ru/:search', rejectUnauthenticated, (req, res) => {
    console.log(req.params.search);
    const queryText = `SELECT * FROM "words" WHERE "english_entry" = $1;`;
    pool.query(queryText, [req.params.search])
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch((err) => {
        console.log('error in translate.router.js checkDB GETTER', err);
    })
})

// queries DB to check if RUSSIAN word is already present
// ru parameter specifies this word to Russian
// search param is the word to search
router.get('/checkDB/ru-en/:search', rejectUnauthenticated, (req, res) => {
    console.log(req.params.search);
    const queryText = `SELECT * FROM "words" WHERE "russian_entry" = $1;`;
    pool.query(queryText, [req.params.search])
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch((err) => {
        console.log('error in translate.router.js checkDB GETTER', err);
    })
})

module.exports = router;
