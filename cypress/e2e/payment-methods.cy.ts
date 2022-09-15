describe('PaymentMethods', () => {
  beforeEach(() => {
    cy.loginAdmin();
    cy.visit('/sales/payment-methods');
    cy.contains('Payment methods');
  });

  it('adding new payment method', () => {
    cy.get('app-payment-method-add-form input[formControlName="name"]').type(
      'Test Cypress Payment Method',
    );
    cy.get(
      'app-payment-method-add-form input[formControlName="description"]',
    ).type('Test description');
    cy.get('app-payment-method-add-form input[type="number"]').type('100');
    cy.get('app-payment-method-add-form button').contains('Add').click();

    cy.get('app-payment-methods-list').should(
      'contain.text',
      'Test Cypress Payment Method',
    );
  });

  it('editing payment method', () => {
    cy.get('app-payment-methods-list')
      .contains('Test Cypress Payment Method')
      .click();
    cy.get(
      '.paymentMethod-expanded-row + .paymentMethod-detail-row input[formControlName="name"]',
    )
      .clear()
      .type('Test Cypress Payment Method 2');
    cy.get(
      '.paymentMethod-expanded-row + .paymentMethod-detail-row input[formControlName="description"]',
    )
      .clear()
      .type('Test description 2');
    cy.get(
      '.paymentMethod-expanded-row + .paymentMethod-detail-row input[type="number"]',
    )
      .clear()
      .type('200');
    cy.get('.paymentMethod-expanded-row + .paymentMethod-detail-row  button')
      .contains('Save')
      .click();

    cy.get('app-payment-methods-list')
      .should('contain.text', 'Test Cypress Payment Method 2')
      .should('contain.text', 'Test description 2')
      .should('contain.text', '200');
  });

  it('deleting payment method', () => {
    cy.get('app-payment-methods-list')
      .contains('Test Cypress Payment Method 2')
      .click();
    cy.get('.paymentMethod-expanded-row + .paymentMethod-detail-row button')
      .contains('Delete')
      .click();
    cy.get('.mat-dialog-actions button').contains('Delete').click();

    cy.get('app-payment-methods-list').should(
      'not.include.text',
      'Test Cypress Payment Method 2',
    );
  });
});
