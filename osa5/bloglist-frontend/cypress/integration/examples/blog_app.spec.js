describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Akseli Aho',
      username: 'daxud',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('daxud')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('#notification').contains('wrong username or password')
    })

    it('user can log in', function() {
      cy.get('#username').type('daxud')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.get('#logout').click()
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function () {
      cy.get('#username').type('daxud')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.fi')
      cy.get('#create').click()
      cy.contains('test title test author')
    })

    it('A blog can be liked', function() {
      // first create a blog
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.fi')
      cy.get('#create').click()
      // then test like button
      cy.contains('test title test author')
        .contains('show more')
        .click()
      cy.get('#like-button').click()
    })

    it('A blog can be deleted', function () {
      // first create a blog
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.fi')
      cy.get('#create').click()

      //then delete
      cy.contains('test title test author')
        .contains('show more')
        .click()
      cy.get('#remove-button').click()
      cy.get('html').should('not.contain', 'test title test author')
    })

    it('Blogs are sorted according to likes', function () {
      // first create a blog
      cy.contains('new blog').click()
      cy.get('#title').type('test title 1')
      cy.get('#author').type('test author 1')
      cy.get('#url').type('www.test1.fi')
      cy.get('#create').click()
      // another one
      cy.contains('new blog').click()
      cy.get('#title').type('test title 2')
      cy.get('#author').type('test author 2')
      cy.get('#url').type('www.test2.fi')
      cy.get('#create').click()

      //like the second blog
      cy.contains('test title 2 test author 2')
        .contains('show more')
        .click()
      cy.contains('test title 2 test author 2')
        .contains('like').click()

      // now that the second blog is liked the first blog SHOULD NOT be on top anymore
      // get('#blog-element') returns the first blog in the page, so the one that is on top
      cy.get('#blog-element')
        .should('not.contain','test title 1 test author 1')
        .should('contain', 'test title 2 test author 2')
    })
  })

})