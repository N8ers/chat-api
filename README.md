# chat-api
This is a Node/Express API connecting to a Postgress databse, using standard REST endpoints and Socket.io

## Getting Started
1. Create a postgres database named `chatapi`
2. Clone this repository
3. `npm install` to install dependencies
4. `npx knex migrate:up` to assign the `chatapi` database, its schema
5. `npm run plant-custom-seed` to populate the database with some starter data
6. `npm run dev` to start a nodemon development server
