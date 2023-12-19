**README.md**

# Node.js API com Cache, PostgreSQL e Redis

Este é um exemplo simples de uma API Node.js que utiliza Redis para caching, PostgreSQL para armazenar dados de alunos e Docker compose para orquestrar serviços em contêineres Docker. A aplicação inclui uma rota para obter informações sobre um aluno, com suporte a caching para melhorar o desempenho.

## Pré-requisitos

Certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuração do Banco de Dados

Antes de executar a aplicação, você precisará configurar o PostgreSQL e o Redis. Se você já tem instâncias em execução ou deseja usar instâncias existentes, pode pular estas etapas.

### PostgreSQL

Se você não tiver o PostgreSQL, você pode usar o Docker Compose para configurar um contêiner:

```bash
docker-compose up -d
```

Isso iniciará um contêiner PostgreSQL com as configurações especificadas no arquivo `docker-compose.yml`.

**Populando o Banco de Dados com Dados de Exemplo**

Para popular o PostgreSQL local com o arquivo `alunos.sql`, você pode usar o Docker. Execute o seguinte comando no terminal:

```bash
 docker exec -i postgres-container  psql -U postgres -d postgres_database  < alunos.sql
```

Substitua `seu_usuario` e `seu_banco_de_dados` pelos valores adequados.

## Instalação de Dependências

No diretório do projeto, instale as dependências do Node.js:

```bash
npm install
```

## Executando a Aplicação

Para iniciar a aplicação, execute o seguinte comando:

```bash
npm start
```

A aplicação será iniciada na porta padrão `3000`. Você verá a mensagem `App listening on port 3000` indicando que a aplicação está em execução.

## Uso da Rota

A API possui uma rota para obter informações sobre um aluno. Use o seguinte endpoint:

- **GET /aluno/:id**: Obtém informações sobre um aluno pelo ID. A rota suporta caching para melhorar o desempenho.

Exemplo de uso:

```bash
curl http://localhost:3000/aluno/1
```

Certifique-se de substituir `1` pelo ID do aluno desejado.

Lembre-se de que esta é uma aplicação de exemplo, e você pode adaptá-la conforme necessário para atender aos requisitos específicos do seu projeto.

## Aplicações utilizadas

![Node.js Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/128px-Node.js_logo.svg.png)

![Redis logo](https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Redis_Logo.svg/128px-Redis_Logo.svg.png)

![Postgres logo](https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg)

![Docker compose logo](https://openwhisk.apache.org/images/deployments/logo-docker-compose-text.svg)