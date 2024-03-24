# Blog MVC usando MongoDB, Express.js e Node.js

Este é um exemplo de uma aplicação MVC simples para um blog, onde MongoDB é utilizado como banco de dados, Express.js para o servidor web e Node.js como o ambiente de execução do servidor.

## Pré-requisitos

Antes de começar, as seguintes ferramentas devem estar instaladas em sua máquina:

- Node.js (versão 10 ou superior)
- MongoDB (versão 3.6 ou superior)

## Configuração

1. Clone o repositório
```
git clone https://github.com/Danielsilverio81/my_personal_blog_crud.git
```


2. Instale as dependências:

```
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```
CONNECTIONSTRING = "sua-url-do-mongodb"
```

Substitua `sua-url-do-mongodb` pela URL de conexão do seu banco de dados MongoDB.

## Executando a aplicação

Para iniciar o servidor, execute o seguinte comando:

```
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.


## Contribuição

Sinta-se à vontade para contribuir com melhorias neste projeto. Basta seguir estas etapas:

1. Faça um fork do projeto
2. Crie uma branch para sua modificação (`git checkout -b feature/sua-feature`)
3. Faça commit de suas alterações (`git commit -am 'Adicionando nova feature'`)
4. Faça push para a branch (`git push origin feature/sua-feature`)
5. Crie um novo Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT.
