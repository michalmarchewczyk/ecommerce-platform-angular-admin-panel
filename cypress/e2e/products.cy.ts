describe('Products', () => {
  beforeEach(function () {
    cy.loginAdmin();
    cy.visit('/catalog/products');
    cy.contains('Products');
  });

  it('adding new product', () => {
    cy.get('a').contains('add').click();

    cy.get('.product-name input').type('Test Cypress Product');
    cy.get('.product-price input').type('100');
    cy.get('.product-stock input').type('10');
    cy.get('.product-description textarea').type('Test Product Description');

    cy.fixture('test.jpg', null).as('image');
    cy.get('input[type=file]').selectFile('@image', { force: true });

    cy.intercept('POST', '/products').as('addRequest');
    cy.get('button').contains('Save').click();
    cy.wait('@addRequest');

    cy.location('pathname').should('include', '/catalog/products/');

    cy.visit('/catalog/products');
    const row = cy.get('.mat-row').contains('Test Cypress Product').parent();
    row.should('include.text', 'Test Cypress Product');
    row.should('include.text', '100');
    row.should('include.text', '10');
    row.should('include.text', 'Test Product Description');
    row.find('img').should('exist');
  });

  it('editing product', () => {
    const row = cy.get('.mat-row').contains('Test Cypress Product').parent();
    row.click();

    cy.get('.product-name input').clear().type('Test Cypress Product 2');
    cy.get('button').contains('Cancel').click();
    cy.get('.product-name input').should('have.value', 'Test Cypress Product');

    cy.get('.product-name input').clear().type('Test Cypress Product 2');
    cy.get('.product-price input').clear().type('200');
    cy.get('.product-stock input').clear().type('20');
    cy.get('.product-description textarea')
      .clear()
      .type('Test Product Description 2');

    cy.intercept('PATCH', '/products/*').as('editRequest');
    cy.get('button').contains('Save').click();
    cy.wait('@editRequest');
    cy.get('button')
      .contains('Save')
      .parent({ timeout: 10000 })
      .should('be.disabled');

    cy.visit('/catalog/products');
    const row2 = cy.get('.mat-row').contains('Test Cypress Product 2').parent();
    row2.should('include.text', 'Test Cypress Product 2');
    row2.should('include.text', '200');
    row2.should('include.text', '20');
    row2.should('include.text', 'Test Product Description 2');
  });

  it('editing product attributes', () => {
    const row = cy.get('.mat-row').contains('Test Cypress Product 2').parent();
    row.click();

    cy.get('.mat-tab-label').contains('Attributes').click();

    cy.get('app-product-attributes-add-form .mat-select-trigger').click();
    cy.get('mat-option').contains('Create new attribute type').click();

    cy.get('.cdk-dialog-container .mat-select-trigger').click();
    cy.get('mat-option').contains('Number').click();
    cy.get('.cdk-dialog-container input').type('Test Cypress Attribute');
    cy.get('.cdk-dialog-container button').contains('Create').click();

    cy.get('app-product-attributes-add-form .mat-select-trigger').click();
    cy.get('mat-option').contains('Test Cypress Attribute').click();

    cy.get('app-product-attributes-add-form input[type=number]').type('10');
    cy.get('app-product-attributes-add-form button').contains('Add').click();

    cy.get('app-product-attributes .mat-list-item')
      .contains('Test Cypress Attribute')
      .should('exist');
    cy.get('.mat-list-item input').should('have.value', '10');

    cy.intercept('PATCH', '/products/*/attributes').as('attrRequest');
    cy.get('.mat-list-item input').clear().type('20').blur();
    cy.wait('@attrRequest');
    cy.reload();
    cy.get('.mat-tab-label').contains('Attributes').click();
    cy.get('.mat-list-item input').should('have.value', '20');

    cy.get('.mat-list-item button').click();
    cy.get('.mat-list-item')
      .contains('Test Cypress Attribute')
      .should('not.exist');
  });

  it('deleting product', () => {
    const row = cy.get('.mat-row').contains('Test Cypress Product 2').parent();
    row.click();

    cy.get('button').contains('Delete').click();
    cy.get('.cdk-dialog-container button').contains('Cancel').click();

    cy.get('button').contains('Delete').click();
    cy.get('.cdk-dialog-container button').contains('Delete').click();

    cy.location('pathname').should('eq', '/catalog/products');
    cy.contains('.mat-row', 'Test Cypress Product 2').should('not.exist');
  });
});
