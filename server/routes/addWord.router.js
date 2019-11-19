const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

// needs authorization
// posts new word to database
router.post('/newWord', (req, res) => {
    console.log('in addWord/newWord post route, req.body:', req.body);
    const queryText = `INSERT INTO "words" ("english_entry", "russian_entry", "image_url") VALUES ($1, $2, $3);`;
    pool.query(queryText, [req.body.original_word, req.body.translation, req.body.image])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(err => {
        console.log('error in addWord/newWord post request', err);
        res.sendStatus(500);
    })
})

module.exports = router;