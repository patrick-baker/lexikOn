const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
// will retrieve all card lists for the logged in user
router.get('/userLists', rejectUnauthenticated, (req, res) => {
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

// will retrieve all card lists not in the the logged-in user's repertoire
router.get('/inverseUserLists', rejectUnauthenticated, (req, res) => {
    console.log('req.user', req.user);
    const queryText=` SELECT * FROM "card_sets"
    WHERE "card_sets"."id" NOT IN (
    SELECT "card_sets"."id" FROM "user" 
       JOIN "user_sets" ON "user"."id" = "user_sets"."user_id"
       JOIN "card_sets" ON "user_sets"."set_id" = "card_sets"."id"
       WHERE "user"."id" = $1);`;
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