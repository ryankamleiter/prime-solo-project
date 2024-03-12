const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in router get')
    // placeholder queryText
    const queryText = ` SELECT
    "card_user_reference"."user_id",
    "card_user_reference"."card_id",
    "card_user_reference"."status",
    "card"."player_name",
    "card"."manufacturer",
    "card"."series",
    "card"."year",
    "card_user_reference"."grade",
    "card_user_reference"."date_purchased" AS "date_purchased",
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

router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "card" (player_name, manufacturer, series, year)
    VALUES 
    ($1, $2, $3, $4);`;
    pool.query(queryText, [req.body.player_name, req.body.manufacturer, req.body.series, req.body.year])
    .then((result) => {
        console.log(req.body)
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log("Error in card router post", err)
    });
});

module.exports = router;
