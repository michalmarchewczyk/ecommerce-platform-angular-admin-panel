describe('Categories', () => {
  beforeEach(function () {
    cy.loginAdmin();
    cy.visit('/catalog/categories');
    cy.contains('Categories');
  });

  it('adding new categories', () => {
    cy.get('input[type=text]').type('Test Cypress Category');
    cy.get('button').contains('Add').click();
    cy.get('app-categories-tree').contains('Test Cypress Category');

    cy.get('.mat-tree-node')
      .contains('Test Cypress Category')
      .find('.add-button')
      .click({ force: true });
    cy.get('input[type=text]').type('Test Cypress Category Nested');
    cy.intercept('POST', '/categories').as('addRequest');
    cy.get('button').contains('Add').click();
    cy.wait('@addRequest');
    cy.contains('.mat-tree-node', 'Test Cypress Category')
      .parent()
      .should('contain', 'Test Cypress Category Nested');

    cy.get('.mat-tree-node')
      .contains('Test Cypress Category')
      .find('.add-button')
      .click({ force: true });
    cy.get('input[type=text]').type('Test Cypress Category Nested 2');
    cy.intercept('POST', '/categories').as('addRequest2');
    cy.get('button').contains('Add').click();
    cy.wait('@addRequest2');
    cy.contains('.mat-tree-node', 'Test Cypress Category')
      .parent()
      .should('contain', 'Test Cypress Category Nested 2');

    cy.get('.mat-tree-node')
      .contains('Test Cypress Category Nested')
      .find('.add-button')
      .click({ force: true });
    cy.get('input[type=text]').type('Test Cypress Category Nested Nested');
    cy.intercept('POST', '/categories').as('addRequest3');
    cy.get('button').contains('Add').click();
    cy.wait('@addRequest3');
    cy.contains('.mat-tree-node', 'Test Cypress Category Nested')
      .parent()
      .should('contain', 'Test Cypress Category Nested Nested');
  });

  it('editing category', () => {
    cy.contains('.mat-tree-node', 'Test Cypress Category').click();
    cy.get('app-category').contains('Test Cypress Category');

    cy.get('app-category-details .category-name input')
      .clear()
      .type('Test Cypress Category Updated');
    cy.get('app-category-details .category-description textarea')
      .clear()
      .type('Test Cypress Category Description');
    cy.get('app-category-details .category-slug input')
      .clear()
      .type('test-cypress-category-slug');
    cy.get('app-category-details button').contains('Save').click();

    cy.get('app-category').contains('Test Cypress Category Updated');
  });

  it('editing category products', () => {
    cy.visit('/catalog/products');
    cy.get('a').contains('add').click();
    cy.get('.product-name input').type('Test Cypress Product');
    cy.get('.product-price input').type('100');
    cy.get('.product-stock input').type('10');
    cy.get('.product-description textarea').type('Test Product Description');
    cy.fixture('test.jpg', null).as('image');
    cy.get('input[type=file]').selectFile('@image', { force: true });
    cy.get('button').contains('Save').click();

    cy.visit('/catalog/categories');
    cy.contains('.mat-tree-node', 'Test Cypress Category').click();
    cy.get('app-category').contains('Test Cypress Category');

    cy.get('.mat-tab-label').contains('Products').click();

    cy.get('app-category-products .mat-select-trigger').click();
    cy.contains('mat-option', 'Test Cypress Product').click({ force: true });
    cy.get('app-category-products button')
      .contains('Add')
      .click({ force: true });
    cy.get('app-category-products .products-list').contains(
      'Test Cypress Product',
    );

    cy.get('app-product-card button').contains('Delete').click({ force: true });
    cy.get('app-category-products .products-list').should(
      'not.contain',
      'Test Cypress Product',
    );

    cy.visit('/catalog/products');
    cy.get('.mat-row').contains('Test Cypress Product').parent().click();
    cy.get('button').contains('Delete').click();
    cy.intercept('DELETE', '/products/*').as('deleteRequest');
    cy.get('.cdk-dialog-container button').contains('Delete').click();
    cy.wait('@deleteRequest');
  });

  it('deleting categories', () => {
    cy.contains('.mat-tree-node', 'Test Cypress Category Nested Nested')
      .find('a')
      .click({
        force: true,
      });
    cy.get('button').contains('Delete category').click();
    cy.get('.cdk-dialog-container button').contains('Delete').click();

    cy.contains('.mat-tree-node', 'Test Cypress Category Nested 2')
      .find('a')
      .click({
        force: true,
      });
    cy.get('button').contains('Delete category').click();
    cy.get('.cdk-dialog-container button').contains('Delete').click();

    cy.contains('.mat-tree-node', 'Test Cypress Category Nested')
      .find('a')
      .click({
        force: true,
      });
    cy.get('button').contains('Delete category').click();
    cy.get('.cdk-dialog-container button').contains('Delete').click();

    cy.contains('.mat-tree-node', 'Test Cypress Category Updated')
      .find('a')
      .click({
        force: true,
      });
    cy.get('button').contains('Delete category').click();
    cy.get('.cdk-dialog-container button').contains('Delete').click();

    cy.get('app-categories-tree').should(
      'not.contain',
      'Test Cypress Category',
    );
  });
});
