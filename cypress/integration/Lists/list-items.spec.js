describe('List Items', function () {
    
    beforeEach(function () {   
        cy.seedAndVisit() 
    })

    it('Properly displays completed items', function () {
        cy.get('.todo-list li')
            .filter('.completed')//filter: fillters the input based on the given arrgument
            .should('have.length', 1)
            .and('contain', 'itemTest 2')
            .find('.toggle')//find: find the elements in the children given the arggument class
            .should('be.checked')//checkbox is checked
    })

    it('Shows remainding todos in footer', function () {
        cy.get('.todo-count')
            .should('contain', 3)

    })

    it('Removes a todo', function () {
        cy.route({  //backend XHR stub call
            url: '/api/todos/1',
            method: 'DELETE',
            status: 200,
            response: {}
        })     

        cy.get('.todo-list li')
            .as('list') //creates an alias of the list items
        
        cy.get('@list')
            .first()//first item
            .find('.destroy') //hidden element until mouse hoover
            //.click({force: true}) //forces cypress to disable internal checks since mouse needs to hover to click the button (not recommended)
            .invoke('show')
            .click()

        cy.get('@list')
            .should('have.length', 3)
            .and('not.contain', 'itemTest 1')
        
    })

    it('Marks an incomplete item complete', function () {
        cy.fixture('todos')
            .then(todos => { //accepts a function to receive the fixture data as an arrgument to allow to work on the data
                const target = Cypress._.head(todos) //cypress already has utility libraries for data accessing, here getting first data passing the arrgument
                cy.route(
                    'PUT',
                    `/api/todos/${target.id}`,
                    Cypress._.merge(target, {isComplete: true})
                )     
                
                cy.get('.todo-list li')
                    .first()
                    .as('first-todo')

                cy.get('@first-todo')
                    .find('.toggle')
                    .click()
                    .should('be.checked')
                
                cy.get('@first-todo')
                    .should('have.class', 'completed')

                cy.get('.todo-count')
                    .should('contain', 2)
            }) 
    })

})