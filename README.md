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
 docker exec -i postgres-container  psql -U postgres -d postgpostgres_databaseres  < alunos.sql                                                                                                    ()
```

Substitua `seu_usuario` e `seu_banco_de_dados` pelos valores adequados.

### Redis

Para instalar o Redis, execute os seguintes comandos:

```bash
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis-stack-server
```

**Verificar Versão Instalada**

```bash
redis-server --version
redis-cli --version
```

**Testar Conectividade**

```bash
redis-cli
127.0.0.1:6379> ping
```

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
