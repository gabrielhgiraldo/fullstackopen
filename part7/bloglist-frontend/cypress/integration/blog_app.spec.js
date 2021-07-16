
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'test user',
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
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        name: 'test user',
        username: 'testUser',
        password: '123'
      }).then(response => {
        localStorage.setItem('user', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
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

    describe('and multiple blogs exist', function() {
      beforeEach(function(){
        cy.createBlog({ title: 'new blog', author: 'bob', url: 'www.blog.com', likes: 2 })
        cy.createBlog({ title: 'new blog 2', author: 'bob 2', url: 'www.blog.com', likes: 4 })
        cy.createBlog({ title: 'new blog 3', author: 'bob 3', url: 'www.blog.com', likes: 1 })
      })

      it('a blog can be liked', function() {
        cy.contains('new blog bob')
          .contains('view')
          .click()
        cy.contains('new blog bob')
          .parent()
          .contains('like')
          .click()
        cy.contains('new blog bob')
          .parent()
          .contains('likes 3')
      })

      it('user who created blog can delete it', function() {
        cy.contains('new blog bob')
          .contains('view')
          .click()
        cy.contains('new blog bob')
          .parent()
          .contains('remove')
          .click()
        cy.contains('new blog bob').should('not.exist')
      })

      it('blogs are sorted by likes', function() {
        cy.get('.blog')
          .then(blogs => {
            let prevLikes = Number.MAX_VALUE
            for (const blog of blogs) {
              // console.log(blog)
              cy.wrap(blog)
                .contains('like')
                .parent()
                .invoke('text')
                .then(text => {
                  const numLikes = parseFloat(text.match(/\d+/)[0])
                  cy.wrap(numLikes).should('be.lt', prevLikes)
                  prevLikes = numLikes
                })
            }
          })
      })
    })
  })
})