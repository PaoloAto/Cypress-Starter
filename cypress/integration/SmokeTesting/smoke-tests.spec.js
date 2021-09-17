//The other tests (not smoke tests) allowed for testing without the backend even being connected yet (integration tests take up majority of the tests)
//This tests interact with more components and does not rely on stub requests

describe('Smoke Tests', () => {
    beforeEach(() => {
        cy.request('GET', 'api/todos')
            .its('body')
            .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
    })

    context('With no todos', () => {
        it('Saves new todos', () => {
            const items = [
                {text: "Test Input 1", expectedLength: 1},
                {text: "Test Input 2", expectedLength: 2},
                {text: "Test Input 3", expectedLength: 3}
            ]

            cy.visit('/')
            cy.server()
            cy.route('POST', 'api/todos') //tells cypress to wait for the post request once wait is called
                .as('create')//alias for the request

            cy.wrap(items) //wraps the array
                .each( todos => { //each will take a function which takes todos the argument (useful for possible server/network delays)
                    cy.focused()
                        .type(todos.text)
                        .type('{enter}')
    
                    cy.wait('@create')//waits for the response before going to the next action (wait can also be given time in(ms))
    
                    cy.get('.todo-list li')
                        .should('have.length', todos.expectedLength)
                })
        })
    })

    context('With active todos', () => {
        beforeEach(() => {
            cy.fixture('todos')
                .each(todo => {
                    const newTodo = Cypress._.merge(todo, {isComplete: false}) //new todo for each todo that takes the todo from the fixture and merge to an object literal to a false property
                    cy.request('POST', '/api/todos', newTodo) //makes a post request to the backend
                })
            cy.visit('/')
        })

        it('Loads existing data from the db', () => {
            cy.get('.todo-list li')
                .should('have.length', 4)
        })

        it('Deletes todos', () => {
            cy.server()
            cy.route('DELETE', '/api/todos/*') //use a wildcard in the path so that the id value can be not specific 
                .as('delete') 

            cy.get('.todo-list li')
                .each($el => { //iterates on each element
                    cy.wrap($el) //wraps each element
                        .find('.destroy')//use find to get the child button with the class given in the arrgument
                        .invoke('show')//since the element is hidden until user hover use invoke to make the button show 
                        .click()

                    cy.wait('@delete')
                })
                .should('not.exist')//asserts that the class given in the arggument should no longer exist
        })

        it('Toggles todos', () => {
            const clickAndWait = ($el) => {
                cy.wrap($el) //wraps each element
                    .as('item')
                    .find('.toggle')//use find to get the child button with the class given in the arrgument
                    .click()

                cy.wait('@update')
            }

            cy.server()
            cy.route('PUT', '/api/todos/*') 
                .as('update') 

            cy.get('.todo-list li')
                .each($el => { //iterates on each element
                    clickAndWait($el) //refactored to a function to reduce redundant code
                    cy.get('@item')
                        .should('have.class', 'completed')
                })
                .each($el => { //multiple each can be chained
                    clickAndWait($el) 
                    cy.get('@item')
                        .should('not.have.class', 'completed') 
                })
        })
    })
})