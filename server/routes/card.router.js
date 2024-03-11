const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in router get')
    // placeholder queryText
    const queryText = `    SELECT
    "card_user_reference"."user_id",
    "card_user_reference"."card_id",
    "card"."player_name",
    "card"."manufacturer",
    "card"."series",
    "card"."year",
    "card_user_reference"."grade",
    DATE("card_user_reference"."date_purchased") AS "date_purchased",
    "card_user_reference"."purchase_price"
FROM
    "card_user_reference"
JOIN
    "user" ON "card_user_reference"."user_id" = "user"."id"
JOIN
    "card" ON "card_user_reference"."card_id" = "card"."id";
`
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.log('Error fetching cards: ', err);
            res.sendStatus(500);
        })
});

module.exports = router;
