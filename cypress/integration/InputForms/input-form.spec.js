describe("Input Form", function () {   //Describes the main task to be done 

   //How to run this practice react app for testing: Run first in cmd using 1) [npm run dev] -> 2) In another cmd [npm run cypress] 

  beforeEach(function () {   //Runs before each test
    // cy.visit('http://localhost:3030') //visit: page to be visited

    // cy.visit('/') //this version of visit uses the cypres.json where baseUrl address is specified

    cy.seedAndVisit([]) 
  })

  it("focuses input on load", function () {   //Subtasks or steps taken
    //Test Type: Check Element
    //Example of how to check element and classes

    cy.focused() //focused: gets the element focused on the page
        .should('have.class','new-todo') // should: assertion on the input where it should contain specified in arggs 1 given arrgs 2
  })

  it("accepts input", function () { //.only: the tests runs onitself (does not account for changes done on prior tests)
    //Test Type: Text Input
    //Example of controlled input to reflect user input in website

    const typeTest = "Test" //can use variables for holding values

    cy.get('.new-todo')//get: no need for focus
        .type(typeTest)//type: types in the selected element value in arggs 1
        .should('have.value',typeTest) 
  })

  context('Form Submission', function () { // context: for grouping and organizing tasks
    beforeEach(function () {
      cy.server() //server: starts a server 
    });

    it("Adds a new todo on submit", function () {
      const testString = 'Test new todo'
      cy.route('POST', '/api/todos', { //route: to define the request to be handled
        name: testString, //these are predefined responses that the wep app receives
        id: 1,
        isComplete: false
      }) 
   
      cy.get('.new-todo') //syntax for getting the class atributes, Ex: '.new-todo', '.todo-list' => Syntax: .'className'
        .type(testString)
        .type('{enter}') // {enter} simulates the press of the enter button
        .should('have.value', '') //should be an empty string

      cy.get('.todo-list li') //li: gets the child list elements
        .should('have.length', 1)//length: how many
        .and('contain', testString) //and: just an alias for should (both do the same thing)
    })

    it('Shows error on failed submission', function () {
      cy.route({ 
        url: '/api/todos/',
        method: 'POST',
        status: 500,
        response: {}
      })

      cy.get('.new-todo')
        .type('test{enter}') //2 actions done, first is types the 'test' string after it will press the enter key

      cy.get('.todo-list li')
        .should('not.exist') //does not exist in the element
      
      cy.get('.error') //checks if an error is displayed
        .should('be.visible') // error message should be seen
    }) 
  })
})