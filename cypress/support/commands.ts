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

Cypress.Commands.add('createTestProduct', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/products`,
    body: {
      name: 'Cypress Test Product',
      price: 100,
      description: 'Cypress Test Product Description',
      stock: 10,
    },
  });
});

Cypress.Commands.add('deleteTestProduct', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/products`,
  }).then((response) => {
    const testProduct = response.body.find(
      (p: any) => p.name === 'Cypress Test Product',
    );
    if (testProduct) {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('API_URL')}/products/${testProduct.id}`,
      });
    }
  });
});
