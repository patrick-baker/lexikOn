const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

// posts preexisting word to chosen card_set, which is stored in add card page as
// match route param from card set list
router.post('/existingWord', (req, res) => {
    console.log('in addWord/existingWord post route, req.body:', req.body);
    const queryText=`INSERT INTO "words_in_sets" ("word_id", "set_id")
        VALUES ($1, $2);`;
        pool.query(queryText, [req.body.word_id, req.body.set_id])
        .then(() => {
            console.log('successful POST of existing word to words_in_sets');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error in POST to words_in_sets from existing word POST', err);
            res.sendStatus(500);
        })
})

// needs authorization
// posts new word to database from AddWord form
// also posts that word to the words_in_set, using set_id sent in req.body
router.post('/newWord', (req, res) => {
    console.log('in addWord/newWord post route, req.body:', req.body);
    const queryText = `INSERT INTO "words" ("english_entry", "russian_entry", "image_url", "image_artist") 
    VALUES ($1, $2, $3, $4) RETURNING id;`;
    pool.query(queryText, [req.body.original_word, req.body.translation, req.body.image, req.body.imageAuthor])
    .then((results) => {
        console.log('results in /newWord:', results);
        const newWordid = results.rows[0].id;
        console.log('newWordid:', newWordid);
        const queryText=`INSERT INTO "words_in_sets" ("word_id", "set_id")
        VALUES ($1, $2);`;
        pool.query(queryText, [newWordid, req.body.set_id])
        .then(() => {
            console.log('successful POST of new word and words_in_sets');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error in POST to words_in_sets from new word POST', err);
            res.sendStatus(500);
        })
    })
    .catch(err => {
        console.log('error in addWord/newWord post request', err);
        res.sendStatus(500);
    })
})

module.exports = router;