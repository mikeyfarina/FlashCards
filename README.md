# Flashcards

### Full-Stack flashcards application developed with React, Express, and MongoDB

## To develop locally:

### To start server:

In the root directory:
```
npm run dev
```
The express server will start with nodemon to track any changes on the back end.

### To start client:

In a new terminal, enter the `/client` directory and run: 
```
npm start
```

### To run tests:

This application contains unit and integration tests through Jest as well as End-to-End testing with Cypress.

#### To run tests using Jest: 
```
npm run test
```
#### To run tests using Cypress:
Close all existing instances of the app.

In the root directory:
```
npm run start:test
```
This starts the server with `NODE_ENV=test` and uses a separate database to ensure the same environment for each test.

In a new terminal on the root directory, `cd client` and then run: 
```
npm run cypress:open
```
This starts cypress and opens a new window with GUI explaining the tests.

## Architecture of application:

The root directory is an Express server and inside of the client folder is a front end applcation developed in React.

### Express Server:

#### [`/models`](/models):

`/flashcard.js`:
This is the model used for flashcard representation in the database.

attribute | type | description
---       | ---  | ---
`front` | `String` | front of flashcard.
`back` | `String` | back of flashcard. 
`date` | `Date` | time flashcard was created. 
`user` | `ObjectId` | id of user who created flashcard. 
`set` | `ObjectId` | id of set that the flashcard belongs to. 

`/set.js`:
This is the model used for set representation in the database.

attribute | type | description
---       | ---  | ---
`title` | `String` | title of set. 
`user` | `ObjectId` | id of user who created set. 
`username` | `String` | username of author of set.
`flashcards` | Array of `ObjectId` | ids of flashcards that belong to the set. 

`/user.js`:
This is the model used for user representation in the database.

attribute | type | description
---       | ---  | ---
`username` | `String` | username of user. 
`name` | `String` | name of user. 
`passwordHash` | `String` | encrypted hash of password used to protect user information and decrypted when needed using `bcrypt`.
`flashcards` | Array of `ObjectId` |  ids of flashcards that were created by the user. 
`sets` | Array of `ObjectId` | ids of sets that were created by the user.
`photoNumber` | `Number` | profile photo option used on user's profile page.

#### [`/controllers`](/controllers):

`/flashcards.js`:
This controller is responsible for all requests that require information regarding flashcards. 

route | method | description
 ---  |  ---   |    ---   
`/` | GET | returns all flashcards in database.
`/:id` | GET | returns flashcard with matching id or returns 404 if none exist.
`/` | POST | creates a flashcard with `front`, `back`, `set.id`, and the user token received by request and decoded with `JSONWebToken`.
`/:id` | DELETE | deletes a flashcard with matching id from the database and removes the relation from `Set` and `User`.
`/:id` | PUT | updates flashcard with information passed into request after authenticating that the editing user is the creator.

`/sets.js`:
This controller is responsible for all requests that require information regarding sets. 

route | method | description
 ---  |  ---   |    ---   
`/` | GET | returns all sets in database.
`/:id` | GET | returns set with matching id or returns 404 if none exist.
`/:id/flashcards` | GET | returns all flashcards within set that matches id or returns 404 if no flashcards exist.
`/` | POST | creates a set with `title` and the user token received by request and decoded with `JSONWebToken`.
`/:id` | DELETE | deletes a set with matching id from the database and removes deletes all flashcards that were within then deleted set from `User`.
`/:id` | PATCH | updates title of set with data passed into request after authenticating that the editing user is the creator.

`/users.js`:
This controller is responsible for all requests that require information regarding users. 

route | method | description
 ---  |  ---   |    ---   
`/` | GET | returns all users in database.
`/:username` | GET | returns user with matching `username` or returns 404 if none exist.
`/` | POST | creates a user with `username` and `password` from request.
`/:id` | DELETE | deletes a user with matching id from the database.
`/:username/profile` | PATCH | updates profile picture of user with data passed into request.

`/login.js`:
This controller is responsible for all requests that require information regarding login. 

route | method | description
 ---  |  ---   |    ---   
`/` | POST | logs in a user after ensuring information is correct by:<br> &emsp; - validating that `username` exists<br> &emsp; - comparing plain-text password with decoded password hash using `bcrypt`.

`/testing.js`:
This controller is responsible for all requests that require information regarding testing. 

route | method | description
 ---  |  ---   |    ---   
`/reset` | POST | - wipes entire `Flashcard`, `Set`, and `User` databases<br> - only functional when `NODE_ENV=test`

### React Frontend:

#### within [`/client/src`](/src):

##### [`App.js`](App.js):
This component contains the `react-router` routes that allow different pages to be loaded based on the current URL.

##### [`/components`](/components):
This folder holds all of the React components used for the frontend. The folder also contains each component's css module.

##### [`/hooks`](/hooks):
This folder contains the `useMousePosition` hook that is responsible for the hover effect on the flashcard.

##### [`/images/clipart`](/clipart):
This folder contains the image art for the `CreateAccountPrompt` component that displays on the homescreen if there is no user currently logged in.

##### [`/images/portraits`](/portraits):
This folder contains the six profile photo options for a users profile page.

##### [`/pages`](/pages):
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
##### [`/services`](/services):
This folder contains helpful services that help ease communication from a component to the server by utilizing routes specified in `/controllers/`.

##### [`/styles`](/styles):
This folder contains global css styles as well as a css module for `ui` such as `button` or `input`

##### [`/utils`](/utils):
This folder contains a helper that imports all of the profile photo options from `/images/portraits` and formats them into an array. 
