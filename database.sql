-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (500) UNIQUE NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "card" (
    "id" SERIAL PRIMARY KEY,
    "player_name" VARCHAR (200),
    "manufacturer" VARCHAR (80),
    "series" VARCHAR (200),
    "year" INTEGER
);

CREATE TABLE "card_user_reference" (
	"card_id" INT REFERENCES "card",
	"user_id" INT REFERENCES "user",
	"status" VARCHAR,
	"date_purchased" DATE,
	"purchase_price" DECIMAL,
	"date_sold" DATE,
	"sale_price" INT,
	"grade" DECIMAL
	);
