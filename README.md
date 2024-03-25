# Cardfolio

Welcome to Cardfolio, an app where users can effortlessly manage their sports card collections. This app offers a seamless experience with features including collection management, wishlist functionality, and transaction history tracking. Easily organize and view your cards, set up a wishlist to track desired additions, and monitor the buying and selling activity of your collection. With a user-friendly interface and customizable options our app caters to collectors of all levels.

## Installation

- Fork and clone this repository
- Create a database named "card_app" in postgreSQL
- Create the tables from the database.sql file in postgreSQL
- Use npm to install all required dependencies

```bash
npm install
```
```bash
npm run server
```
```bash
npm run client
```

- Open localhost:5173 in Google Chrome

## Usage
1. Register a new user or sign in if you've already created an account
2. The user will be brought to their "Inventory"
 - From the inventory, users can add, delete or edit any field of the cards they own
- The "Mark as Sold" button allows users to enter relevant sale information and move a card to the "Sold Cards" page
3. "Sold Cards" provides a history of all sold cards
- From the sold cards screen, users can add, delete or edit any field of the cards
4. "Wishlist" provides all of the cards that the user has added to the wishlist
- From the wishlist screen, users can add, delete or edit any field of the cards
- The "Mark as Purchase" button allows users to enter relevant purchase information and move a card to the "Inventory" page

*Insert walkthrough video link
## Creator

Ryan Kamleiter, full stack engineering student, Prime Digital Academy

## License

[MIT](https://choosealicense.com/licenses/mit/)