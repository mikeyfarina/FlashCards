// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then((response) => {
    localStorage.setItem(
      'loggedFlashcardAppUser',
      JSON.stringify(response.body)
    );
  });
});

Cypress.Commands.add('loginThenCreateSet', ({ username, password }) => {
  cy.request({
    url: 'http://localhost:3001/api/login',
    method: 'POST',
    body: {
      username,
      password,
    },
  }).then((response) => {
    localStorage.setItem(
      'loggedFlashcardAppUser',
      JSON.stringify(response.body)
    );
    cy.createSet({
      title: 'Default Test Set',
    });
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createSet', ({ title }) => {
  cy.request({
    url: 'http://localhost:3001/api/sets',
    method: 'POST',
    body: {
      title,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedFlashcardAppUser')).token
      }`,
    },
  }).then((res) => {
    console.log('set id ', res.body.id);
    cy.createFlashcard({
      front: 'first test flashcard',
      back: 'back test flashcard',
      setId: res.body.id,
    });
  });
});

Cypress.Commands.add('createFlashcard', ({ front, back, setId }) => {
  cy.request({
    url: 'http://localhost:3001/api/flashcards',
    method: 'POST',
    body: {
      front,
      back,
      setId,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedFlashcardAppUser')).token
      }`,
    },
  });
});
