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
Close all existing instances of the app.

In `/` folder:
```
npm run start:test
```
This starts the server with `NODE_ENV=test` and uses a separate database to ensure the same environment for each test.

Then, enter the client directory and run: 
```
npm run cypress:open
```
This starts cypress and opens a new window with GUI explaining the tests.

## Architecture of application

The root directory is an Express server and inside of the client folder is a front end applcation developed in React.

### Express Server

#### `/models`

`/flashcard.js`
This is the model used for flashcard representation in the database.

- `front`
  - `String`, front of flashcard. 
- `back`
  - `String`, back of flashcard. 
- `date`
  - `Date`, time flashcard was created. 
- `user`
  - `ObjectId`, Id of user who created flashcard. 
- `set`
  - `ObjectId`, Id of set that the flashcard belongs to. 
 
`/set.js`
This is the model used for set representation in the database.

- `title`
  - `String`, title of set. 
- `user`
  - `ObjectId`, Id of user who created set. 
- `username`
  - `String`, username of author of set.
- `flashcards`
  - Array of `ObjectId`, Ids of flashcards that belong to the set. 

`/user.js`
This is the model used for user representation in the database.

- `username`
  - `String`, username of user. 
- `name`
  - `String`, name of user. 
- `passwordHash`
  - `String`, Encrypted hash of password used to protect user information and decrypted when needed using `bcrypt`.
- `flashcards`
  - Array of `ObjectId`, Ids of flashcards that were created by the user. 
- `sets`
  - Array of `ObjectId`, Ids of sets that were created by the user.
- `photoNumber`
  -`Number`, profile photo option used on user's profile page.

#### `/controllers`

`/flashcards.js`
This controller is responsible for all requests that require information regarding flashcards. 

- `/` - GET 
  - returns all flashcards in database.
- `/:id` - GET
  - returns flashcard with matching id or returns 404 if none exist.
- `/` - POST
  - creates a flashcard with `front`, `back`, `set.id`, and the user token received by request and decoded with `JSONWebToken`.
- `/:id` - DELETE
  - deletes a flashcard with matching id from the database and removes the relation from `Set` and `User`.
- `/:id` - PUT
  - updates flashcard with information passed into request after authenticating that the editing user is the creator.

`/sets.js`
This controller is responsible for all requests that require information regarding sets. 

- `/` - GET 
  - returns all sets in database.
- `/:id` - GET
  - returns set with matching id or returns 404 if none exist.
- `/:id/flashcards` - GET
  - returns all flashcards within set that matches id or returns 404 if no flashcards exist.
- `/` - POST
  - creates a set with `title` and the user token received by request and decoded with `JSONWebToken`.
- `/:id` - DELETE
  - deletes a set with matching id from the database and removes deletes all flashcards that were within then deleted set from `User`.
- `/:id` - PATCH
  - updates title of set with data passed into request after authenticating that the editing user is the creator.

`/users.js`
This controller is responsible for all requests that require information regarding users. 

- `/` - GET 
  - returns all users in database.
- `/:username` - GET
  - returns user with matching `username` or returns 404 if none exist.
- `/` - POST
  - creates a user with `username` and `password` from request.
- `/:id` - DELETE
  - deletes a user with matching id from the database.
- `/:username/profile` - PATCH
  - updates profile picture of user with data passed into request.

`/login.js`
This controller is responsible for all requests that require information regarding login. 

- `/` - POST
  - logs in a user after ensuring information is correct by:
    - validating that `username` exists 
    - comparing plain-text password with decoded password hash using `bcrypt`.

`/testing.js`
This controller is responsible for all requests that require information regarding testing. 

- `/reset` - POST
  - wipes entire `Flashcard`, `Set`, and `User` databases
  - only functional when `NODE_ENV=test`

### React Frontend

#### `within /client/src`

##### `/components`
This folder holds all of the React components used for the frontend. The folder also contains each component's css module.

##### `/hooks`
This folder contains the `useMousePosition` hook that is responsible for the hover effect on the flashcard.

##### `/images/clipart`
This folder contains the image art for the `CreateAccountPrompt` component that displays on the homescreen if there is no user currently logged in.

##### `/images/portraits`
This folder contains the six profile photo options for a users profile page.

##### `/pages`
This folder contains the three pages that `react-router` utilizes to display different pages on different URLs.
- The three pages are:
  - `FlashcardsDisplay`
    - This is the main page of the application. 
    - This page displays a desired set of flashcards, and shows previews of all flashcards on the sidebar.
  - `Homepage`
    - This page displays the component `CreateAccountPrompt` if no one is logged in. 
    - There is a search bar to filter through all existing sets. 
    - A grid display of all existing flashcard sets that contain links to the author's page as well as links that allow for opening a set to a specific flashcard.
  - `UserInformation`
    - This is a user's profile page.
    - It displays all of a specific user's created flashcards and sets.
##### `/services`
This folder contains helpful services that help ease communication from a component to the server by utilizing routes specified in `/controllers/`.

##### `/styles`
This folder contains global css styles as well as a css module for `ui` such as `button` or `input`

##### `/utils`
This folder contains a helper that imports all of the profile photo options from `/images/portraits` and formats them into an array. 

##### `App.js`
This component contains the `react-router` routes that allow different pages to be loaded based on the current URL.
