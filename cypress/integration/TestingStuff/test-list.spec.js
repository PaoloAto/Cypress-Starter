const todoCheck = ["itemTest 1", "itemTest 2", "itemTest 3", "itemTest 4"]

describe('List Items', function () {
    
    beforeEach(function () {   
        cy.seedAndVisit() 
        cy.get('.todo-list li')
            .should('have.length', 4)
    })

    it('Test List Traversal (A little hardcoded approach) ', function () {
        cy.get('.todo-list li').then( items => {
            expect(items[0]).to.contain.text('itemTest 1')
            expect(items[1]).to.contain.text('itemTest 2')
            expect(items[2]).to.contain.text('itemTest 3')
            expect(items[3]).to.contain.text('itemTest 4')
        })
    })

    it('Test List Traversal (Less hardcoded better for long lists) ', function () {
        cy.get('.todo-list li').each( (item, index) => {
            //This is another way of writing syntax
            /*
            cy
                .wrap(item)
                .should('contain.text', todoCheck[index]) 
            */
            cy.wrap(item)
            cy.should('contain.text', todoCheck[index])
        })
    })

    it('Checking a specific item in a list using `eq` (This example gets the 2nd index)', function () {
        cy.get('.todo-list li')
            .eq(1)
            .should('contain.text', "itemTest 2")
    })

    
})