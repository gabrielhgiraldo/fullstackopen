
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

  describe('when logged in', function() {
    beforeEach(async function() {
      const response = await cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testUser',
        password: '123'
      })
      localStorage.setItem('user', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('bob')
      cy.get('#url').type('www.blog.com')

      cy.get('#create-blog').click()
      cy.get('.success')
        .contains('a new blog new blog by bob added')
      cy.get('.blog')
        .should('contain', 'new blog')
        .and('contain', 'bob')
    })
  })
})