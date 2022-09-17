declare namespace Cypress {
  interface Chainable<Subject> {
    loginAdmin(): Chainable<Subject>;
    createTestProduct(): Chainable<Subject>;
    deleteTestProduct(): Chainable<Subject>;
  }
}
