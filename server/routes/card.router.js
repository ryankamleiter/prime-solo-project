const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in router get')
    const queryText = `SELECT
    "card_user_reference"."user_id",
    "card_user_reference"."card_id",
    "card_user_reference"."status",
    "card"."player_name",
    "card"."manufacturer",
    "card"."series",
    "card"."year",
    "card_user_reference"."grade",
    "card_user_reference"."date_purchased" AS "date_purchased",
    "card_user_reference"."purchase_price",
    "card_user_reference"."date_sold" AS "date_sold",
    "card_user_reference"."sale_price"
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

router.post('/', rejectUnauthenticated, async (req, res) => {
    const { player_name, manufacturer, series, year, status, date_purchased, purchase_price, grade, date_sold, sale_price } = req.body;

    try {
        // Insert data into card table
        const cardQuery = `INSERT INTO "card" (player_name, manufacturer, series, year)
                           VALUES ($1, $2, $3, $4)
                           RETURNING id`;
        const cardResult = await pool.query(cardQuery, [player_name, manufacturer, series, year]);
        const cardId = cardResult.rows[0].id;

        // Insert data into card_user_reference table
        const cardUserRefQuery = `INSERT INTO "card_user_reference" (card_id, user_id, status, date_purchased, purchase_price, grade, date_sold, sale_price)
                                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        await pool.query(cardUserRefQuery, [cardId, req.user.id, status, date_purchased, purchase_price, grade, date_sold, sale_price]);

        res.sendStatus(201);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.sendStatus(500);
    }
});

module.exports = router;
