/// <reference types="Cypress" />

describe('Blog app', function() {
  const addedUser = {
    name: 'John Tester',
    username: 'tester',
    password: '123testing456'
  }

  const newBlog = {
    title: 'Blog created with Cypress',
    author: 'Cypress',
    url: 'http://localhost:3000'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser(addedUser)
  })

  it('Login form is shown', function() {
    cy
      .get('#login-form')
      .contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(addedUser.username)
      cy.get('#password').type(addedUser.password)
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', `Logged as ${addedUser.username}`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains(`${addedUser.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: addedUser.username, password: addedUser.password })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('input[placeholder="Title"]').type(newBlog.title)
      cy.get('input[placeholder="Author"]').type(newBlog.author)
      cy.get('input[placeholder="Url"]').type(newBlog.url)

      cy.contains('create blog').click()
      cy.contains(newBlog.title)

      cy.visit('http://localhost:3000')
      cy.contains(newBlog.title)
    })

    describe('and several blogs exist', function() {
      beforeEach(() => {
        cy.createBlog(newBlog)
      })

      it('a blog can be liked by the user', () => {
        cy.contains('view').click()

        cy.get('button').contains('like').click()
        cy.contains('likes 1')

        cy.visit('http://localhost:3000')

        cy.contains('view').click()
        cy.contains('likes 1')
      })

      it('a blog can be deleted', () => {
        cy.contains(newBlog.title).contains('view').click()
        cy.contains(newBlog.title).contains('remove').click()

        cy.contains(newBlog.title).should('not.exist')

        cy.visit('http://localhost:3000')
        cy.contains(newBlog.title).should('not.exist')
      })

      it('a blog cannot be deleted if the user is not its owner', () => {
        const notOwner = {
          username: 'not-owner',
          name: 'Not the owner',
          password: 'http://localhost:3000'
        }

        cy.createUser(notOwner)
        cy.login({ username: notOwner.username, password: notOwner.password })

        cy.contains(newBlog.title).contains('view').click()
        cy.contains(newBlog.title).contains('remove').should('not.exist')
      })
    })
  })
})
