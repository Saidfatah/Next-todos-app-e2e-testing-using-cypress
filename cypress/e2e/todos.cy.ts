describe('todos spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/todosTestsExample');
  });

  it('should display loading state then title', () => {
    cy.get('[data-testid="todosLoaderUI"]').should('exist');
    cy.get('[data-testid="todosTitle"]').should('exist').should('have.text', 'Todo List');
    cy.get('[data-testid="todosLoaderUI"]').should('not.exist');
  });

  it('should display the new todo form', () => {
    cy.get('[data-testid="newTodoInput"]').should('exist')
    cy.get('[data-testid="addTodoButton"]').should('exist')
  });

  it('should display the todo list', () => {
    cy.get('[data-testid="todo-1"]').should('exist');
    cy.get('[data-testid="todo-2"]').should('exist');
  });


  it('should add a new todo', () => {
    const newTodo = 'Test new todo';

    // Add a new todo 
    cy.get('[data-testid="newTodoInput"]').type(newTodo);
    cy.get('[data-testid="addTodoButton"]').click()
    cy.get('[data-testid="addTodoButton"]').should('be.disabled');

    // Verify the new todo is added after 1 second
    cy.wait(1100)

    cy.get('[data-testid="addTodoButton"]').should('not.be.disabled');

    const newTodoLi=cy.get('[data-testid="todo-3"]')
    .should('exist')
    
    newTodoLi.get('span')
    .should('exist')
    .should('contain.text',newTodo)
    
    newTodoLi.get('[data-testid="todo-3-checkbox"]')
    .should('exist')
    .should('not.be.checked'); // Verify the checkbox is not checked
    
  });

  it('should remove first todo', () => {
    cy.get('[data-testid="todo-1-remove-button"]')
    .click()

    cy.wait(1100)
    
    cy.get('[data-testid="todo-1"]')
    .should('not.exist')
 
  });

  it('should check todo with id 2', () => {
    cy.get('[data-testid="todo-2-checkbox"]')
    .click()

    cy.wait(1100)
    
    cy.get('[data-testid="todo-2-checkbox"]')
    .should('exist')
    .should('be.checked'); 
    
  });

  it('should uncheck todo with id 2', () => {
    cy.get('[data-testid="todo-2-checkbox"]')
    .click()

    cy.wait(1100)
    
    cy.get('[data-testid="todo-2-checkbox"]')
    .should('exist')
    .should('not.be.checked'); 
    
  });

  it('should show no todos state when all todos are deleted', () => {
    cy.get('[data-testid="todo-1-remove-button"]')
    .click()

    cy.wait(1100)

    cy.get('[data-testid="todo-2-remove-button"]')
    .click()


    cy.wait(1100)
    
    cy.get('[data-testid="noTodosUI"]')
    .should('exist')
  });

})

export {}