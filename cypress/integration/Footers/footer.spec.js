describe("Footer Test", function () {
    context('with a single todo', function () {
        it('Displays a singular todo in count', function () {
            cy.seedAndVisit([{id: 1, name: 'test 1', isComplete: false}])
            cy.get('.todo-count')
                .should('contain', '1 todo left')
        })
    })
    context('With multiple todos', function () {
        beforeEach(function () {
            cy.seedAndVisit()
        })

        it('Displays multiple todos in count', function () {
            cy.get('.todo-count')
                .should('contain', '3 todos left')
        })

        it('Handles different filter links (Using Data Driven Testing)', function () {
            //Test uses data driven testing to reduce duplicate code and redundancy and creates a single test that does multiple variations of the same feature

            const filters = [ //array of object literals to represent the diferent tests
                {link: 'Active', expectedLength: 3},
                {link: 'Completed', expectedLength: 1},
                {link: 'All', expectedLength: 4}
            ]

            cy.wrap(filters) //wrap puts data given in the argument in the context of cypress to allow chaining of cypress commands
                .each(filter => { //the each accepts the function as an argument
                    cy.contains(filter.link)
                        .click()
                
                    cy.get('.todo-list li')
                        .should('have.length', filter.expectedLength)    
                })

                //Sample of Data Driven Testing to make tests more dynamic (may be useful for testing different types of accounts)
                //Can also save reusable data in fixtures then load them in the spec file to be used
                /* const names = ['user1', 'user2', 'user3']
                names.forEach(name => {
                it(`works for ${name}`, () => {
                    cy.visit('...')
                    cy.contains(name)
                })
                }) */
        })
    })
})