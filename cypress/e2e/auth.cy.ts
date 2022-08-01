describe('Auth', () => {
  before(() => {
    cy.visit('/');
  });

  it('login and logout user user', () => {
    cy.contains('Login');
    cy.get('input[type="email"]').type('admin@test.local');
    cy.get('input[type="password"]').type('test1234');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
    cy.contains('Dashboard');

    cy.reload();
    cy.contains('Dashboard');
    cy.location('pathname').should('eq', '/');

    cy.get('button').contains('logout').click();
    cy.location('pathname').should('eq', '/login');
    cy.contains('Login');

    cy.reload();
    cy.location('pathname').should('eq', '/login');
    cy.contains('Login');
  });

  it('try to login with invalid data', () => {
    cy.get('input[type="email"]').type('test');
    cy.get('input[type="password"]').focus().blur();
    cy.contains('Invalid email');
    cy.contains('Password is required');
  });

  it('try to login with wrong credentials', () => {
    cy.get('input[type="email"]').type('admin@test.local');
    cy.get('input[type="password"]').type('test123456');
    cy.get('button[type="submit"]').click();
    cy.contains('Wrong email or password');
  });

  it('redirect to login page if user is not logged in', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/login');
  });
});
