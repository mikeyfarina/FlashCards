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
    cy.contains('login').click();
  });

  it('user can log in', function () {
    cy.contains('login').click();

    cy.get('[data-input-username]').click().type('root');
    cy.get('[data-input-password]').click().type('password');
    cy.get('[data-button-submit-login]').click();

    cy.contains('hello, root');
  });

  it('login fails with wrong info', function () {
    cy.contains('login').click();

    cy.get('[data-input-username]').type('root');
    cy.get('[data-input-password]').type('wrong password');
    cy.get('[data-button-submit-login]').click();
    cy.wait(1000);
    cy.get('header').should('not.contain', 'hello, root');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'root',
        password: 'password',
      });
    });

    describe('and the flashcard page loads when a flashcard exists', function () {
      beforeEach(function () {
        cy.createSet({
          title: 'test set',
        })
          .then(() => cy.visit('http://localhost:3000'))
          .then(() => cy.get('[data-new-flashcard-button]').click())
          .then(() => cy.wait(1500));
      });
      describe('the flashcard functions correctly', function () {
        it('displays the first card', function () {
          cy.get('[data-flashcard-element]').should('contain', 'front');
        });

        it('displays the back of the first card when clicked', function () {
          cy.get('[data-flashcard-front-text]').should('contain', 'front');
          cy.get('[data-flashcard-element]').click();
          cy.get('[data-flashcard-back-text]').should('contain', 'back');
        });
      });

      describe('the flashcard tools work correctly', function () {
        it('a new flashcard can be created', function () {
          cy.get('[data-new-flashcard-button]').click();
          cy.contains('front');
        });

        it('displays new card when new card is created', function () {
          cy.get('[data-new-flashcard-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '2front');
          cy.get('[data-flashcard-element]').should('not.contain', '1');
        });

        it('the front of the card is displayed after adding a new card', function () {
          cy.get('[data-flashcard-element]').should('contain', '1front');
          cy.get('[data-flashcard-element]').click();

          cy.get('[data-new-flashcard-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '2front');
          cy.get('[data-flashcard-element]').should('not.contain', '1');
        });

        it('a flashcard can be edited', function () {
          cy.get('[data-edit-flashcard-button]').click();
          cy.get('[data-flashcard-front-text]').type(' test edit');

          cy.get('[data-edit-flashcard-button]').click();
          cy.get('[data-flashcard-front-text]').contains('front test edit');
        });

        it('a flashcard can be deleted by user who created it', function () {
          cy.get('[data-flashcard-front-text]').contains('front');
          cy.get('[data-new-flashcard-button]').click();

          cy.get('[data-flashcard-element]').should('not.contain', '1');
          cy.get('[data-flashcard-element]').contains('2');

          cy.get('[data-delete-flashcard-button]').click();
          cy.get('[data-flashcard-element]').contains('1');
          cy.get('[data-flashcard-element]').should('not.contain', '2');
        });

        it('a flashcard made by one user can not be deleted by a different one', function () {
          cy.get('[data-flashcard-element]').contains('1front');
          cy.get('[data-new-flashcard-button]').click();

          cy.get('[data-logout-button]').click();

          const user2 = {
            name: 'test',
            username: 'test',
            password: 'password',
          };
          cy.request('POST', 'http://localhost:3001/api/users/', user2);

          cy.login({ username: 'test', password: 'password' });

          cy.get('[data-card-number-element]').contains('2');
          cy.get('[data-delete-flashcard-button]').should('not.exist');
          cy.get('[data-card-number-element]').should('not.contain', '1');
          cy.get('[data-card-number-element]').contains('2');
        });
      });

      describe('cycling through the flashcards works properly', function () {
        it('displays previous card when clicking left arrow button', function () {
          cy.get('[data-new-flashcard-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '2front');
          cy.get('[data-flashcard-element]').should('not.contain', '1front');

          cy.get('[data-previous-card-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '1front');
        });

        it('displays next card when clicking right arrow button', function () {
          cy.get('[data-new-flashcard-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '2front');
          cy.get('[data-flashcard-element]').should('not.contain', '1front');

          cy.get('[data-previous-card-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '1front');

          cy.get('[data-next-card-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '2front');
          cy.get('[data-flashcard-element]').should('not.contain', '1front');
        });

        it('if changing cards while on back of one, display front of next', function () {
          cy.get('[data-new-flashcard-button]').click();

          cy.get('[data-flashcard-element]').should('not.contain', '1front');
          cy.get('[data-flashcard-element]').should('contain', '2front');

          cy.get('[data-next-card-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '1front');
          cy.get('[data-flashcard-element]').click();
          cy.get('[data-flashcard-element]').should('contain', 'back');

          cy.get('[data-previous-card-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '2front');
        });

        it('displays first card if clicking next arrow on last card', function () {
          cy.get('[data-new-flashcard-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '2front');
          cy.get('[data-flashcard-element]').should('not.contain', '1front');

          cy.get('[data-new-flashcard-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '3front');
          cy.get('[data-flashcard-element]').should('not.contain', '2front');

          cy.get('[data-new-flashcard-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '4front');
          cy.get('[data-flashcard-element]').should('not.contain', '3front');

          cy.get('[data-next-card-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '1front');
        });

        it('displays last card if clicking previous arrow on first card', function () {
          cy.get('[data-new-flashcard-button]').click();
          cy.get('[data-flashcard-element]').should('contain', '2front');
          cy.get('[data-flashcard-element]').should('not.contain', '1front');

          cy.get('[data-previous-card-button]').click();
          cy.get('[data-previous-card-button]').click();

          cy.get('[data-flashcard-element]').should('contain', '2front');
          cy.get('[data-flashcard-element]').should('not.contain', '1front');
        });
      });
    });
  });
});
