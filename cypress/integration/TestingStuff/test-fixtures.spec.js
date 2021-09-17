describe('For Testing Stuff in Fixtures', function () { //always include function ()

    before(function () {
        cy.fixture('testdata').then(function (testdata){ //this only works if put in a before() block
            this.testdata = testdata //loading fixture data and saving it in a local variable
        })

        cy.seedAndVisit([])
    })

    it.only('Testing another way of doing Fixture data input', function () {
        const todo = this.testdata.todo
    
        cy.get('.new-todo')
          .type(todo)
          .should('have.value',todo) 
      })
})