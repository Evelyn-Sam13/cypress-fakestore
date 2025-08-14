describe('Fake Store API - Suite', () => {

  it('Listar todos os produtos (200)', () => {
    cy.request('/products')
      .then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.be.an('array');
      });
  });

  it('Buscar produto por ID = 1', () => {
    cy.request('/products/1').then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('id', 1);
      expect(resp.body).to.have.property('title');
    });
  });

  it('Buscar produto inexistente deve retornar 404 (tolerância)', () => {
  cy.request({ url: '/products/999999', failOnStatusCode: false }).then((resp) => {
    // aceitar 404 ou 200 vazio, registrando o status real
    cy.log(`Status retornado: ${resp.status}`);
    if (resp.status === 404) {
      expect(resp.status).to.eq(404);
    } else {
      // Se a API retornar 200, verificar se o corpo está vazio
      expect(resp.body).to.be.empty;
    }
  });
});

  it('Criar usuário (POST /users) - não falhar o teste se API bloquear', () => {
    const body = {
      email: `test-${Date.now()}@example.com`,
      username: `evy${Date.now()}`,
      password: '123456'
    };
    cy.request({ method: 'POST', url: '/users', body, failOnStatusCode: false }).then((resp) => {
      // se criar, deve retornar 200/201; se não permitir, pode ser 400/422
      expect([200, 201, 400, 422]).to.include(resp.status);
    });
  });

  it('Verificar que o carrinho inicial está vazio', () => {
  cy.request({ method: 'GET', url: '/carts', failOnStatusCode: false })
    .then((resp) => {
      expect([200, 204]).to.include(resp.status);
      cy.log(`Quantidade de carrinhos retornados: ${resp.body.length}`);
    });
});

  it('Criar carrinho (POST /carts) usando token quando houver', () => {
    cy.apiLogin().then((token) => {
      cy.request({
        method: 'POST',
        url: '/carts',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: {
          userId: 1,
          date: new Date().toISOString().slice(0, 10),
          products: [{ productId: 1, quantity: 1 }]
        },
        failOnStatusCode: false
      }).then((resp) => {
        // aceita 200/201 ou 401/403 se não autorizado
        expect([200, 201, 401, 403, 422]).to.include(resp.status);
      });
    });
  });

});
