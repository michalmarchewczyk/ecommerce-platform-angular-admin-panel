describe('DeliveryMethods', () => {
  beforeEach(() => {
    cy.loginAdmin();
    cy.visit('/sales/delivery-methods');
    cy.contains('Delivery methods');
  });

  it('adding new delivery method', () => {
    cy.get('app-delivery-method-add-form input[formControlName="name"]').type(
      'Test Cypress Delivery Method',
    );
    cy.get(
      'app-delivery-method-add-form input[formControlName="description"]',
    ).type('Test description');
    cy.get('app-delivery-method-add-form input[type="number"]').type('100');
    cy.get('app-delivery-method-add-form button').contains('Add').click();

    cy.get('app-delivery-methods-list').should(
      'contain.text',
      'Test Cypress Delivery Method',
    );
  });

  it('editing delivery method', () => {
    cy.get('app-delivery-methods-list')
      .contains('Test Cypress Delivery Method')
      .click();
    cy.get(
      '.deliveryMethod-expanded-row + .deliveryMethod-detail-row input[formControlName="name"]',
    )
      .clear()
      .type('Test Cypress Delivery Method 2');
    cy.get(
      '.deliveryMethod-expanded-row + .deliveryMethod-detail-row input[formControlName="description"]',
    )
      .clear()
      .type('Test description 2');
    cy.get(
      '.deliveryMethod-expanded-row + .deliveryMethod-detail-row input[type="number"]',
    )
      .clear()
      .type('200');
    cy.get('.deliveryMethod-expanded-row + .deliveryMethod-detail-row  button')
      .contains('Save')
      .click();

    cy.get('app-delivery-methods-list')
      .should('contain.text', 'Test Cypress Delivery Method 2')
      .should('contain.text', 'Test description 2')
      .should('contain.text', '200');
  });

  it('deleting delivery method', () => {
    cy.get('app-delivery-methods-list')
      .contains('Test Cypress Delivery Method 2')
      .click();
    cy.get('.deliveryMethod-expanded-row + .deliveryMethod-detail-row button')
      .contains('Delete')
      .click();
    cy.get('.mat-dialog-actions button').contains('Delete').click();

    cy.get('app-delivery-methods-list').should(
      'not.include.text',
      'Test Cypress Delivery Method 2',
    );
  });
});
