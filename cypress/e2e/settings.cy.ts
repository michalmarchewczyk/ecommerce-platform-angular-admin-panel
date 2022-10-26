describe('Settings', () => {
  beforeEach(() => {
    cy.loginAdmin();
    cy.visit('/settings');
    cy.contains('Settings');
  });

  it('updating settings', () => {
    cy.get('mat-list-item')
      .contains('Currency')
      .parent()
      .parent()
      .find('mat-select')
      .click();
    cy.get('mat-option').contains('EUR').click({ force: true });
    cy.get('mat-list-item')
      .contains('Countries')
      .parent()
      .parent()
      .find('mat-select')
      .click();
    cy.get('mat-option').contains('Poland').click({ force: true });
    cy.get('mat-option').contains('Germany').click({ force: true });
    cy.get('.cdk-overlay-backdrop').click();
    cy.reload();
    cy.get('mat-list-item')
      .contains('Currency')
      .parent()
      .parent()
      .find('mat-select-trigger')
      .should('contain.text', 'EUR');
    cy.get('mat-list-item')
      .contains('Countries')
      .parent()
      .parent()
      .find('mat-select-trigger')
      .should('contain.text', 'Poland')
      .should('contain.text', 'Germany');
    cy.intercept('PATCH', '/settings/*').as('request');
    cy.get('mat-list-item')
      .contains('Countries')
      .parent()
      .parent()
      .find('mat-select')
      .click();
    cy.get('mat-option').contains('Poland').click({ force: true });
    cy.get('mat-option').contains('Germany').click({ force: true });
    cy.get('.cdk-overlay-backdrop').click();
    cy.wait('@request');
    cy.visit('/catalog/products');
    cy.get('mat-cell').should('contain.text', '€');
  });

  it('adding custom settings', () => {
    cy.get('.mat-tab-label').contains('Custom').click();

    cy.contains('Type *').parent().parent().click();
    cy.get('mat-option').contains('Number').click({ force: true });
    cy.contains('Name *')
      .parent()
      .parent()
      .find('input')
      .type('Test Cypress Setting');
    cy.contains('Value *').parent().parent().find('input').type('123');
    cy.get('button').contains('Add').click();
    cy.get('mat-list-item').should('contain.text', 'Test Cypress Setting');
  });

  it('deleting custom settings', () => {
    cy.get('.mat-tab-label').contains('Custom').click();
    cy.get('mat-list-item')
      .contains('Test Cypress Setting')
      .parent()
      .parent()
      .find('button')
      .click();
    cy.get('button').contains('Delete').click();
    cy.contains('mat-list-item', 'Test Cypress Setting').should('not.exist');
  });
});
