declare namespace Cypress {
  interface Chainable<Subject> {
    loginAdmin(): Chainable<Subject>;
  }
}
