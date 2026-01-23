/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string): Chainable<Subject>;
    newBoard(boardName?: string, columns?: string[]): Chainable<Subject>;
    getBySel(selector: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('getBySel', (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});

// -- This is a parent command --
Cypress.Commands.add('login', (email) => {
  const apiUrl = Cypress.env('apiUrl') || 'http://127.0.0.1:3333';
  cy.request('POST', `${apiUrl}/auth/mock`, { email })
    .as('userLoad')
    .then((response) => {
      expect(response).to.have.property('body');
      cy.setCookie('auth_token', `Bearer ${response.body.token}`);
      cy.reload();
    });
});

Cypress.Commands.add(
  'newBoard',
  (boardName = 'New Board', columns = ['good', 'bad', 'worse']) => {
    const apiUrl = Cypress.env('apiUrl') || 'http://127.0.0.1:3333';
    cy.getCookie('auth_token').then((token) => {
      if (!token) {
        throw new Error('auth_token cookie not found');
      }
      cy.request({
        url: `${apiUrl}/boards`,
        method: 'POST',
        body: { title: boardName, columns },
        headers: {
          Authorization: token.value,
        },
      }).then((response) => {
        expect(response).to.have.property('body');
        cy.visit(`/boards/${response.body?.board?.id}`);
      });
    });
  }
);
