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

Cypress.Commands.add('loginThenCreateFlashcard', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then((response) => {
    localStorage.setItem(
      'loggedFlashcardAppUser',
      JSON.stringify(response.body)
    );
    cy.createFlashcard({
      front: 'first card',
      back: 'back of first',
    });
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createFlashcard', ({ front, back }) => {
  cy.request({
    url: 'http://localhost:3001/api/flashcards',
    method: 'POST',
    body: {
      front,
      back,
      date: new Date(),
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedFlashcardAppUser')).token
      }`,
    },
  });
});
