declare namespace Cypress {
  interface Chainable {
    dataCy(value: string): Chainable<Element>
  }
}
