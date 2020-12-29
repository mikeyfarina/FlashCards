describe('Flashcard App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'root',
      username: 'root',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('front page loads', function () {
    cy.contains('Flashcards');
  });

  it('login form can be opened', function () {
    cy.contains('Login').click();
  });

  it('user can log in', function () {
    cy.contains('Login').click();

    cy.get('#username').type('root');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('hello, root');
  });

  it('login fails with wrong info', function () {
    cy.contains('Login').click();

    cy.get('#username').type('root');
    cy.get('#password').type('wrong password');
    cy.get('#login-button').click();
    cy.wait(1000);
    cy.get('header').should('not.contain', 'hello, root');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.loginThenCreateFlashcard({ username: 'root', password: 'password' });
    });

    describe('and the flashcard page loads when a flashcard exists', function () {
      describe('the flashcard functions correctly', function () {
        it('displays the first card', function () {
          cy.get('.flashcard-text').should('contain', 'first card');
        });

        it('displays the back of the first card when clicked', function () {
          cy.get('.flashcard-text').should('contain', 'first card');
          cy.get('.flashcard').click();
          cy.get('.flashcard-text').should('not.contain', 'first card');
          cy.get('.flashcard-text').should('contain', 'back of first');
        });
      });

      describe('the flashcard tools work correctly', function () {
        it('a new flashcard can be created', function () {
          cy.get('.new-flashcard-button').click();
          cy.contains('front');
        });

        it('displays new card when new card is created', function () {
          cy.get('.new-flashcard-button').click();
          cy.get('.flashcard').should('contain', '2front');
          cy.get('.flashcard-text').should('not.contain', 'first card');
        });

        it('the front of the card is displayed after adding a new card', function () {
          cy.get('.flashcard-text').should('contain', 'first card');
          cy.get('.flashcard').click();
          cy.get('.flashcard-text').should('not.contain', 'first card');
          cy.get('.flashcard-text').should('contain', 'back of first');

          cy.get('.new-flashcard-button').click();
          cy.get('.flashcard-text').should('contain', 'front');
          cy.get('.flashcard-text').should('not.contain', 'back');
        });

        it('a flashcard can be edited', function () {
          cy.get('.edit-flashcard-button').click();
          cy.get('.flashcard-text').type(' test edit');

          cy.get('.edit-flashcard-button').click();
          cy.contains('first card test edit');
        });

        it('a flashcard can be deleted by user who created it', function () {
          cy.get('.flashcard-text').contains('first card');
          cy.get('.new-flashcard-button').click();

          cy.get('.flashcard-text').should('not.contain', 'first card');
          cy.get('.flashcard-text').contains('front');

          cy.get('.delete-flashcard-button').click();
          cy.get('.flashcard-text').contains('first card');
        });

        it('a flashcard made by one user can not be deleted by a different one', function () {
          cy.get('.flashcard-text').contains('first card');
          cy.get('.new-flashcard-button').click();

          cy.get('.logout-button').click();

          const user2 = {
            name: 'test',
            username: 'test',
            password: 'password',
          };
          cy.request('POST', 'http://localhost:3001/api/users/', user2);

          cy.login({ username: 'test', password: 'password' });

          cy.get('.flashcard-text').contains('front');
          cy.get('.delete-flashcard-button').click();
          cy.get('.flashcard-text').should('not.contain', 'first card');
          cy.get('.flashcard').contains('2front');
        });
      });

      describe('cycling through the flashcards works properly', function () {
        it('displays previous card when clicking left arrow button', function () {
          cy.get('.new-flashcard-button').click();
          cy.get('.flashcard').should('contain', '2front');
          cy.get('.flashcard-text').should('not.contain', 'first card');

          cy.get('.previous-flashcard-button').click();
          cy.get('.flashcard-text').should('contain', 'first card');
        });

        it('displays next card when clicking right arrow button', function () {
          cy.get('.new-flashcard-button').click();
          cy.get('.flashcard').should('contain', '2front');
          cy.get('.flashcard-text').should('not.contain', 'first card');

          cy.get('.previous-flashcard-button').click();
          cy.get('.flashcard-text').should('contain', 'first card');

          cy.get('.next-flashcard-button').click();
          cy.get('.flashcard').should('contain', '2front');
          cy.get('.flashcard-text').should('not.contain', 'first card');
        });

        it('if changing cards while on back of one, display front of next', function () {
          cy.get('.new-flashcard-button').click();

          cy.get('.flashcard-text').should('not.contain', 'first card');
          cy.get('.flashcard-text').should('contain', 'front');

          cy.get('.next-flashcard-button').click();
          cy.get('.flashcard-text').should('contain', 'first card');
          cy.get('.flashcard').click();
          cy.get('.flashcard-text').should('contain', 'back of first');

          cy.get('.previous-flashcard-button').click();
          cy.get('.flashcard-text').should('contain', 'front');
        });

        it('displays first card if clicking next arrow on last card', function () {
          cy.get('.new-flashcard-button').click();
          cy.get('.flashcard').should('contain', '2front');
          cy.get('.flashcard-text').should('not.contain', 'first card');

          cy.get('.new-flashcard-button').click();
          cy.get('.flashcard').should('contain', '3front');
          cy.get('.flashcard').should('not.contain', '2front');

          cy.get('.new-flashcard-button').click();
          cy.get('.flashcard').should('contain', '4front');
          cy.get('.flashcard').should('not.contain', '3front');

          cy.get('.next-flashcard-button').click();
          cy.get('.flashcard').should('contain', 'first card');
        });

        it('displays last card if clicking previous arrow on first card', function () {
          cy.get('.new-flashcard-button').click();
          cy.get('.flashcard').should('contain', '2front');
          cy.get('.flashcard-text').should('not.contain', 'first card');

          cy.get('.previous-flashcard-button').click();
          cy.get('.previous-flashcard-button').click();

          cy.get('.flashcard').should('contain', '2front');
          cy.get('.flashcard').should('not.contain', 'first card');
        });
      });
    });
  });
});
