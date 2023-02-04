describe('Pages', () => {
  beforeEach(function () {
    cy.loginAdmin();
    cy.visit('/pages');
    cy.contains('Pages');
  });

  it('adding new page', () => {
    cy.get('a').contains('add').click();

    cy.get('.page-title input').type('Test Cypress Page');
    cy.get('.page-slug input').type('test-cypress-page');
    cy.get('.page-content textarea').type('Test Cypress Page Content');

    cy.get('button').contains('Create').click();

    cy.location('pathname').should('eq', '/pages');

    const row = cy.get('.mat-row').contains('Test Cypress Page').parent();
    row.should('include.text', 'Test Cypress Page');
    row.should('include.text', 'test-cypress-page');
    row.should('include.text', 'Test Cypress Page Content');
  });

  it('editing page', () => {
    const row = cy.get('.mat-row').contains('Test Cypress Page').parent();
    row.click();

    cy.get('.page-title input').clear().type('Test Cypress Page 2');
    cy.get('.page-slug input').clear().type('test-cypress-page-2');
    cy.get('.page-content textarea')
      .clear()
      .type('## Test Cypress Page 2 Content');

    cy.intercept('PATCH', '/pages/*').as('editRequest');
    cy.get('button').contains('Save').click();
    cy.wait('@editRequest');
    cy.get('button').contains('Save').parent().should('be.disabled');

    cy.get('markdown').should(
      'contain.html',
      '<h2>Test Cypress Page 2 Content</h2>',
    );

    cy.visit('/pages');
    const row2 = cy.get('.mat-row').contains('Test Cypress Page 2').parent();
    row2.should('include.text', 'Test Cypress Page 2');
    row2.should('include.text', 'test-cypress-page-2');
    row2.should('include.text', '## Test Cypress Page 2 Content');
  });

  it('deleting page', () => {
    const row = cy.get('.mat-row').contains('Test Cypress Page 2').parent();
    row.click();

    cy.get('button').contains('Delete').click();
    cy.get('.cdk-dialog-container button').contains('Cancel').click();

    cy.get('button').contains('Delete').click();
    cy.get('.cdk-dialog-container button').contains('Delete').click();

    cy.location('pathname').should('eq', '/pages');
    cy.contains('.mat-row', 'Test Cypress Page 2').should('not.exist');
  });
});
