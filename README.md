# Flashcard

### Full-Stack flashcards application developed with React, Node.js, Express, and MongoDB

## To develop locally

### To start server

in `/`:
```
npm run dev
```
The express server will start with nodemon to track any changes on the back end.

### To start client

In a new terminal, enter the client directory and run: 
```
npm start
```

### To run tests

This application contains unit and integration tests through Jest as well as End-to-End testing with Cypress.

#### To run tests using Jest: 
```
npm run test
```
#### To run tests using Cypress:
In the `/` folder, run:
```
npm run start:test
```
This starts the server with `NODE_ENV=test` and uses a separate database to ensure the same environment for each test.

Then, enter the client directory and run: 
```
npm run cypress:open
```
This starts cypress and opens a new window with GUI explaining the tests.

