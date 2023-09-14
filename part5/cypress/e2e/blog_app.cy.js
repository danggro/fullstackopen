describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Superuser',
      username: 'root',
      password: '123456',
    })
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Superuser2',
      username: 'root2',
      password: '123456',
    })
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#input-username')
    cy.get('#input-password')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#input-username').type('root')
      cy.get('#input-password').type('123456')
      cy.contains('Login').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#input-username').type('root')
      cy.get('#input-password').type('wrong')
      cy.contains('Login').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: '123456' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#input-title').type('this is title')
      cy.get('#input-author').type('this is author')
      cy.get('#input-url').type('this is url')

      cy.contains('Create Blog').click()
      cy.contains('this is title this is author')
      cy.contains('a new blog this is title by this is author added')
    })

    describe('and a note exist', () => {
      beforeEach(function () {
        cy.createBlog({ title: 'title', author: 'author', url: 'url' })
      })

      it('users can like a blog', function () {
        cy.get('.blog').contains('view').click()
        cy.get('.blog').contains('like').click()
        cy.contains('1')
      })

      it('users can delete a blog', function () {
        cy.get('.blog').contains('view').click()
        cy.get('.blog').contains('remove').click()
        cy.get('html').should('not.contain', 'title author')
      })

      it('only creator the blog can see delete button', function () {
        cy.contains('Logout').click()
        cy.login({ username: 'root2', password: '123456' })
        cy.get('.blog').contains('view').click()
        cy.get('.blog').should('not.contain', 'remove')
      })
    })

    describe('and several note exist', () => {
      it('ordered according to likes with the blog with the most likes being first', function () {
        cy.createBlog({
          title: 'The title with the most likes',
          author: 'author',
          url: 'url',
          likes: 3,
        })
        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'author',
          url: 'url',
          likes: 2,
        })

        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog')
          .eq(1)
          .should('contain', 'The title with the second most likes')
      })
    })
  })
})
