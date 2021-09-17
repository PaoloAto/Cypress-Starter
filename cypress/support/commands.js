// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//Making custom commands from a group of commands
Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:todos') => { //the parameter uses the fixture data if nothing is declared
    cy.server()
    cy.route('GET', '/api/todos', seedData) //Use fixtures for common data that can be used across different spec tests, loads data after the ':'
    cy.visit('/')  // there are times where you need to visit the page after configuring the route since the page might load and make a request first
})

