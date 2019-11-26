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
    WHERE "user"."id" = $1
    ORDER BY "card_sets"."name";`;
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
       WHERE "user"."id" = $1)
       ORDER BY "card_sets"."name";`;
    pool.query(queryText, [req.user.id])
    .then((results) => {
        console.log('results from /api/cardLists/inverseUserLists request:', results.rows);
        res.send(results.rows);
    })
    .catch((err) => {
        console.log('error in /api/cardLists/userLists request:', err);
        res.sendStatus(404);
    })
});

 // posts new card set to DB, then subsequently posts to user_sets to add that set to the user's repertoire
router.post('/newCardSet', rejectUnauthenticated, (req,res) => {
    console.log('req.user', req.user);
    console.log('req.body:', req.body);
    const queryText= `INSERT INTO "card_sets" ("name", "creator_user_id")
    VALUES ($1, $2) RETURNING id;`
    pool.query(queryText, [req.body.setName, req.user.id])
    .then((results) => {
        console.log(results);
        const newSetid = results.rows[0].id;
        console.log('newSetid:', newSetid);
        const queryText=`INSERT INTO "user_sets" ("user_id", "set_id")
        VALUES ($1, $2);`;
        pool.query(queryText, [req.user.id, newSetid])
        .then(() => {
            console.log('successful POST of new card set and user_set');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error in POST to user_sets from new card set Post', err);
            res.sendStatus(500);
        })
    })
    .catch((err) => {
        console.log('error in new card set Post', err);
        res.sendStatus(403);
    })
})

// adds an existing card set to a user's repertoire
router.post('/addExistingCardSet', rejectUnauthenticated, (req, res) => {
    console.log('req.user', req.user);
    console.log('req.body:', req.body);
    const queryText=`INSERT INTO "user_sets" ("user_id", "set_id")
        VALUES ($1, $2);`;
    pool.query(queryText, [req.user.id, req.body.setId])
    .then(() => {
        console.log('in addExistingCardSet');
        res.sendStatus(200);
    })
    .catch(err => {
        console.log('error in addExistingCardSet:', err)
        res.sendStatus(500);
    })
})

router.put('/updateCardSetName', (req, res) => {
    console.log('in card set name update', req.body);
    const queryText=`UPDATE "card_sets" 
    SET "name" = $1
    WHERE "id" = $2;`;
    pool.query(queryText, [req.body.setName, req.body.setId])
    .then(() => {
        console.log('in updateCardSetName query');
        res.sendStatus(200);
    })
    .catch(err => {
        console.log('error in updateCardSetName query', err);
        res.sendStatus(500);
    })
})

// deletes card set permanently from all relevant tables in required order
// learned about cascade Delete and SQL transactions after the fact; would use one of these strategies in the future
router.delete('/deleteCardSet/:setId', (req, res) => {
    console.log('in card set deletion from user_sets of id:', req.params.setId);
    const queryText1=`DELETE FROM "user_sets" 
    WHERE "set_id" = $1;`;
    const queryText2=`DELETE FROM "words_in_sets" 
    WHERE "set_id" = $1;`;
    const queryText3=`DELETE FROM "card_sets" 
    WHERE "id" = $1;`;
    pool.query(queryText1, [req.params.setId])
    .then(() => {
        console.log('in card set deletion query from words_in_sets of id:', req.params.setId);
        pool.query(queryText2, [req.params.setId])
        .then(() => {
            console.log('in card set deletion query from card_sets of id:', req.params.setId)
            pool.query(queryText3, [req.params.setId])
            .then(() => {
                console.log('successful deletion from card_sets of id:', req.params.id);
                res.sendStatus(200);
            })
            .catch(err => {
                console.log('error in deletion of card_set', req.params.id, err)
                res.sendStatus(500);
            })
        })
        .catch(err => {
            console.log('error in deletion of words_in_sets of set id:', req.params.id, err)
            res.sendStatus(500);
        })
    })
    .catch((err) => {
        console.log('error in deletion of user_sets query of set id:', req.params.id, err);
        res.sendStatus(500);
    })
})

// removes card set from user's repertoire
router.delete('/removeCardSet/:setId', (req, res) => {
    console.log('in card set removal', req.params);
    const queryText=`DELETE FROM "user_sets" 
    WHERE "user_id" = $1 AND "set_id" = $2;`;
    pool.query(queryText, [req.user.id, req.params.setId])
    .then(() => {
        console.log('in removeCardSet query');
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error in removeCardSet query', err);
        res.sendStatus(500);
    })
})

module.exports = router;