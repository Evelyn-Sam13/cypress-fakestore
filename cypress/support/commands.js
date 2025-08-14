// comandos customizados úteis
Cypress.Commands.add('apiLogin', () => {
  // usa baseUrl definido no config (https://fakestoreapi.com)
  return cy.request({
    method: 'POST',
    url: '/auth/login',
    failOnStatusCode: false,
    body: { username: 'johnd', password: 'm38rmF$' }
  }).then((resp) => {
    if (resp.status === 200 && resp.body.token) {
      Cypress.env('token', resp.body.token);
      return resp.body.token;
    }
    return null;
  });
});


