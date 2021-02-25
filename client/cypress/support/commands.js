Cypress.Commands.add('loginAndCreateSet', ({ username, password }) => {
  cy.login({ username, password }).then(cy.createSet({ title: 'test set' }));
});

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
  }).then((set) =>
    cy.createFlashcard({
      front: 'first card',
      back: 'back of first',
      setId: set.id,
    })
  );
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
