Casos de Teste – Cypress Fake Store
1. Listar todos os produtos
Descrição: Recuperar todos os produtos da API Fake Store.

Requisição: GET /products

Validações:

Status HTTP = 200

Retorno deve ser um array de produtos

2. Buscar produto por ID = 1
Descrição: Buscar um produto específico pelo ID.

Requisição: GET /products/1

Validações:

Status HTTP = 200

Retorno deve conter as propriedades id e title

id deve ser igual a 1

3. Buscar produto inexistente (tolerância)
Descrição: Testar o comportamento da API ao buscar um produto que não existe.

Requisição: GET /products/999999

Validações:

Status HTTP pode ser 404, ou

Status HTTP 200 com corpo vazio

O teste registra o status real (cy.log)

4. Criar usuário (POST /users)
Descrição: Criar um novo usuário na API Fake Store.

Requisição: POST /users

Validações:

Status HTTP esperado: 200 ou 201 se criação for permitida

Pode aceitar 400 ou 422 se a criação for bloqueada pela API

Observação: Não falha o teste se a API não permitir a criação

5. Login com credenciais públicas (POST /auth/login)
Descrição: Autenticar com usuário público (johnd).

Requisição: POST /auth/login

Validações:

Status HTTP esperado: 200, 401 ou 403

Se retornar 200, o corpo deve conter o token

6. Criar carrinho (POST /carts) usando token
Descrição: Criar um carrinho para o usuário logado.

Requisição: POST /carts

Validações:

Token obtido via comando customizado cy.apiLogin()

Status HTTP esperado: 200, 201, 401, 403 ou 422

Aceita erro caso o usuário não esteja autorizado

7. Verificar carrinho inicial vazio
Descrição: Validar se o carrinho do usuário começa vazio.

Requisição: GET /carts?userId=1

Validações:

Retorno inicial deve ser um array vazio (sem produtos)

💡 Observações gerais do projeto

Todos os testes são E2E, usando Cypress com base URL configurada.

Comandos customizados (apiLogin) facilitam autenticação.

Testes tolerantes a códigos HTTP variados (404, 400, 401, 403, 422) quando a API não retorna 200.

Relatórios integrados com Mochawesome, gerando JSON e HTML.
