describe('Orders', () => {
  beforeEach(() => {
    cy.loginAdmin();
    cy.visit('/sales/orders');
    cy.contains('Orders');
  });

  it('adding new order', () => {
    cy.createTestProduct();
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/deliveries`,
      body: {
        name: 'Test Order Cypress Delivery Method',
        description: 'Test Cypress Order Delivery Method Description',
        price: 100,
      },
    });
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/payments`,
      body: {
        name: 'Test Cypress Order Payment Method',
        description: 'Test Cypress Order Payment Method Description',
        price: 100,
      },
    });

    cy.visit('/sales/orders');
    cy.contains('Orders');

    cy.get('button').contains('add').click();
    cy.get('body').should('contain.text', 'Create new order');

    cy.get('app-create-order-form input[formControlName="contactEmail"]').type(
      'test@test.local',
    );
    cy.get('app-create-order-form input[formControlName="contactPhone"]').type(
      '+48123456789',
    );
    cy.get('app-create-order-form input[formControlName="fullName"]').type(
      'Test Test',
    );
    cy.get('app-order-items-input .mat-select-trigger').click();
    cy.contains('Test Cypress Product').click({ force: true });

    cy.get(
      'mat-select[formControlName="deliveryMethodId"] .mat-select-trigger',
    ).click();
    cy.contains('Test Cypress Delivery Method').click({ force: true });
    cy.get(
      'app-create-order-form input[formControlName="deliveryAddress"]',
    ).type('Test address');
    cy.get('app-create-order-form input[formControlName="deliveryCity"]').type(
      'Test city',
    );
    cy.get(
      'app-create-order-form input[formControlName="deliveryPostalCode"]',
    ).type('12345');
    cy.get(
      'app-create-order-form input[formControlName="deliveryCountry"]',
    ).type('PL');

    cy.get(
      'mat-select[formControlName="paymentMethodId"] .mat-select-trigger',
    ).click();
    cy.contains('Test Cypress Payment Method').click({ force: true });

    cy.intercept('POST', `/orders`).as('createOrder');
    cy.get('app-create-order-form button[type="submit"]')
      .contains('Create')
      .click();
    cy.wait('@createOrder');

    cy.visit('/sales/orders');
    cy.get('table').should('contain.text', 'Test Test');
    cy.get('table').should('contain.text', 'Test Cypress Order Payment Method');
    cy.get('table').should(
      'contain.text',
      'Test Cypress Order Delivery Method',
    );
  });

  it('editing order', () => {
    cy.get('table').contains('Test Test').click();
    cy.get('.mat-tab-label').contains('Edit').click();

    cy.get('mat-select[formControlName="status"] .mat-select-trigger').click();
    cy.contains('Confirmed').click({ force: true });

    cy.get('input[formControlName="deliveryStatus"]').type(
      'Test delivery status',
      { force: true },
    );
    cy.get('input[formControlName="paymentStatus"]').type(
      'Test payment status',
      { force: true },
    );

    cy.get('button[type="submit"]').contains('Save').click({ force: true });

    cy.get('.mat-tab-label').contains('General').click({ force: true });

    cy.get('app-order-details').should('contain.text', 'confirmed');
    cy.get('app-order-details').should('contain.text', 'Test delivery status');
    cy.get('app-order-details').should('contain.text', 'Test payment status');
  });
});
