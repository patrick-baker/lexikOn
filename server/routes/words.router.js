const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');

const router = express.Router();

// fetch route to DB to grab all the words in the chosen set
router.get('/cardSet', (req, res) => {
    console.log('in /api/words');
    const queryText = `SELECT "set_id", "name" as "set_name", "word_id", "english_entry", "russian_entry", "image_url" FROM "words"
    JOIN "words_in_sets" ON "words_in_sets"."word_id" = "words"."id"
    JOIN "card_sets" ON "card_sets"."id" = "words_in_sets"."set_id"
    WHERE "card_sets"."id" = 1;`;
    pool.query(queryText)
    .then(results => {
        console.log('in /api/words/cardSet, results:', results.rows);
        res.send(results.rows);
    })
    .catch(err => {
        console.log('error in /api/words/cardSet, error:', err);
        res.sendStatus(500);
    })
});

module.exports = router;
