describe('Auth', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.fixture('admin-user.json').as('adminUser');
  });

  it('login and logout user user', function () {
    cy.contains('Login');
    cy.get('input[type="email"]').type(this['adminUser'].email);
    cy.get('input[type="password"]').type(this['adminUser'].password);
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

  it('try to login with wrong credentials', function () {
    cy.get('input[type="email"]').type(this['adminUser'].email);
    cy.get('input[type="password"]').type('test123456');
    cy.get('button[type="submit"]').click();
    cy.contains('Wrong email or password');
  });

  it('redirect to login page if user is not logged in', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/login');
  });
});
