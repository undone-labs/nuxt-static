describe('should have logo', () => {
  it('passes', () => {
    cy.visit(Cypress.env('baseUrl'), {
      auth: {
        username: Cypress.env('USERNAME') || '',
        password: Cypress.env('PASS') || ''
      }
    })
    cy.get('.site-logo').should('exist')
  })
})
