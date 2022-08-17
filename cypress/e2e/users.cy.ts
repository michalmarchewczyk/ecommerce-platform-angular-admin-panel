describe('Users', () => {
  beforeEach(() => {
    cy.fixture('admin-user.json').as('adminUser');
  });

  beforeEach(function () {
    cy.visit('/');
    cy.get('input[type="email"]').type(this['adminUser'].email);
    cy.get('input[type="password"]').type(this['adminUser'].password);
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
    cy.visit('/users');
    cy.contains('Users');
  });

  it('display users list', () => {
    cy.contains('Users');
    cy.contains('admin@test.local');
    cy.contains('Administrator');
  });

  it('adding new user', () => {
    cy.contains('Add user');
    cy.get('app-user-add-form input[type="email"]').type('cypress@test.local');
    cy.get('app-user-add-form input[type="password"]').type('cypress1234');
    cy.get('app-user-add-form button[type="submit"]').click();

    cy.get('app-users-list').contains('cypress@test.local');
  });

  it('editing user', () => {
    cy.get('app-users-list').contains('cypress@test.local').click();
    cy.get('.user-expanded-row + .user-detail-row input[type="email"]')
      .clear()
      .type('cypress2@test.local');
    cy.get('.user-expanded-row + .user-detail-row .mat-select-trigger').click();
    cy.get('mat-option').contains('Manager').click();
    cy.get(
      '.user-expanded-row + .user-detail-row button[type="submit"]',
    ).click();

    cy.get('app-users-list').contains('cypress2@test.local');
    cy.get('app-users-list').contains('Manager');

    cy.get('app-toolbar button').contains('logout').click();
    cy.get('input[type="email"]').type('cypress2@test.local');
    cy.get('input[type="password"]').type('cypress1234');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
    cy.get('app-toolbar').contains('cypress2@test.local');
  });

  it('deleting user', () => {
    cy.get('app-users-list').contains('cypress2@test.local').click();
    cy.get('.user-expanded-row + .user-detail-row button')
      .contains('Delete')
      .click();
    cy.get('.mat-dialog-actions button').contains('Delete').click();

    cy.get('app-users-list').should('not.include.text', 'cypress2@test.local');
  });
});
