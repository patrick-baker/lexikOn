const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// fetch route to DB to grab all the words in the chosen set
router.get('/cardSet/:id', rejectUnauthenticated, (req, res) => {
    console.log(`in /api/words/cardSet/${req.params.id}`);
    const queryText = `SELECT "set_id", "name" as "set_name", "words_in_sets"."id" as "wordInSetId", "creator_user_id", "english_entry", "russian_entry", "image_url", "image_artist" FROM "words"
    RIGHT OUTER JOIN "words_in_sets" ON "words_in_sets"."word_id" = "words"."id"
    RIGHT OUTER JOIN "card_sets" ON "card_sets"."id" = "words_in_sets"."set_id"
    WHERE "card_sets"."id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(results => {
        console.log(`successful call to route /api/words/cardSet/${req.params.id}, results:`, results.rows);
        res.send(results.rows);
    })
    .catch(err => {
        console.log('error in /api/words/cardSet, error:', err);
        res.sendStatus(500);
    })
});

router.delete(`/remove/:id`, rejectUnauthenticated, (req, res) => {
    console.log(`in /api/words/remove/${req.params.id}`);
    const queryText = `DELETE FROM "words_in_sets" 
    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(() => {
        console.log(`successful delete request at /api/words/remove/${req.params.id}`);
        res.sendStatus(200);
    })
    .catch(err => {
        console.log(`error in request to /api/words/remove/${req.params.id}`, err);
        res.sendStatus(500);
    })
})

module.exports = router;
