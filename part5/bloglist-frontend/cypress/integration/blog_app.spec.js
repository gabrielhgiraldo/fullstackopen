
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testUser',
      password: '123'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form#login-form').should('be.visible')
    cy.get('input#username').should('be.visible')
    cy.get('input#password').should('be.visible')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testUser')
      cy.get('#password').type('123')
      cy.get('#login').click()

      cy.contains('blogs')
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testUser')
      cy.get('#password').type('WRONG')
      cy.get('#login').click()

      cy.get('div.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .contains('wrong username or password')
      cy.get('html').should('not.contain', 'logged in')
    })
  })
})