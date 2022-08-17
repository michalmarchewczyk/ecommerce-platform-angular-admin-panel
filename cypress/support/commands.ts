Cypress.Commands.add('loginAdmin', () => {
  cy.session('loginAdmin', () => {
    cy.fixture('admin-user.json').then((adminUser) => {
      cy.visit('/');
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.location('pathname').should('eq', '/');
    });
  });
});
