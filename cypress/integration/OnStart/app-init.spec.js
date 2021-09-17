describe('App initialization', function () {

    it('Loads todos on page load', function () { 
        cy.seedAndVisit() //custom command made in commands.js
        
        cy.get('.todo-list li')
            .should('have.length', 4)
    });

    it('Displays an error on failure', function () {
        cy.server()
        cy.route({ 
            url: '/api/todos/',
            method: 'GET',
            status: 500,
            response: {}
        })
        cy.visit('/')

        cy.get('.todo-list li')
            .should('not.exist') 
      
        cy.get('.error') 
            .should('be.visible')  
    });

});