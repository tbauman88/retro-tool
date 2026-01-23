describe('Retro Tool', () => {
  beforeEach(() => cy.visit('/'));

  it('should login and show landing page', () => {
    cy.login('test-user-1@example.com');
    cy.contains('Create a new Board');
  });

  it('should create a new board', () => {
    cy.login('test-user-1@example.com');
    cy.contains('Create a new Board');

    const boardTitle = 'Test Board';
    const columns = ['Good', 'Bad', 'Better'];

    // Fill out the board form
    cy.getBySel('board_title').type(boardTitle);
    cy.getBySel('column_names').clear();
    cy.getBySel('column_names').type(columns.join(', '));

    // Submit the form
    cy.getBySel('create_board_button').click();

    // Should navigate to board page
    cy.url().should('match', /boards\/.*/);
    cy.contains(boardTitle);
  });

  it('should add cards to a board', () => {
    cy.login('test-user-1@example.com');
    cy.newBoard('Test Board', ['Column 1']);

    // Add a card
    cy.getBySel('column-input-0').type('First card{enter}');
    cy.getBySel('card-list-0').children().should('have.length', 1);

    // Add another card
    cy.getBySel('column-input-0').type('Second card{enter}');
    cy.getBySel('card-list-0').children().should('have.length', 2);
  });

  it('should accept voting input', () => {
    cy.login('test-user-1@example.com');
    cy.newBoard('Test Board', ['Column 1']);

    // Add a card
    cy.getBySel('column-input-0').type('Test card for voting{enter}');
    cy.getBySel('card-list-0').children().should('have.length', 1);

    // Check initial vote count
    cy.getBySel('vote-count-0').contains('0');

    // Upvote
    cy.getBySel('upvote-button-0').click();
    cy.getBySel('vote-count-0').contains('1');

    // Downvote
    cy.getBySel('downvote-button-0').click();
    cy.getBySel('vote-count-0').contains('0');
  });

  it('should add and remove columns', () => {
    cy.login('test-user-1@example.com');
    cy.newBoard('Test Board', ['Column 1']);

    const newColumnName = 'New Column';

    // Open add column modal
    cy.getBySel('add_column_button').click();

    // Fill out form
    cy.getBySel('column_name_field').type(newColumnName);
    cy.getBySel('save_column').click();

    // Assert column exists
    cy.contains(newColumnName);

    // Delete the NEW column (index 1, since Column 1 is index 0)
    cy.getBySel('column-1-menu').click();
    cy.getBySel('delete-column-1-button').click();
    cy.getBySel('confirm_yes').click();

    // Assert column is gone
    cy.contains(newColumnName).should('not.exist');
  });
});
