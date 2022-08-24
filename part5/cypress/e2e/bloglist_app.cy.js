/// <reference types="Cypress" />

describe('Blog app', function() {
  const addedUser = {
    name: 'John Tester',
    username: 'tester',
    password: '123testing456'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', addedUser)
    cy.visit('http://localhost:3000')
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

      cy.get('input[placeholder="Title"]').type('Blog by Cypress')
      cy.get('input[placeholder="Author"]').type('Cypress')
      cy.get('input[placeholder="Url"]').type('url')

      cy.contains('create blog').click()

      cy.visit('http://localhost:3000')
      cy.contains('Blog by Cypress')
    })
  })
})
