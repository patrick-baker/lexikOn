const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
// will retrieve all card lists for the logged in user
// need to use req.user once front end is hooked up
router.get('/userLists', (req, res) => {
    console.log('req.user', req.user);
    const queryText=`SELECT "card_sets"."id", "card_sets"."name", "card_sets"."creator_user_id" FROM "user" 
    JOIN "user_sets" ON "user"."id" = "user_sets"."user_id"
    JOIN "card_sets" ON "user_sets"."set_id" = "card_sets"."id"
    WHERE "user"."id" = $1;`;
    pool.query(queryText, [req.user.id])
    .then((results) => {
        console.log('results from /api/cardLists/userLists request:', results.rows);
        res.send(results.rows);
    })
    .catch((err) => {
        console.log('error in /api/cardLists/userLists request:', err);
        res.sendStatus(404);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;