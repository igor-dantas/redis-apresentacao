const { Pool } = require('pg');
const redis = require('redis');
const { promisify } = require('util');

const pgConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mysecretpassword',
  port: 5432,
};

const redisConfig = {
  host: 'localhost',
  port: 6379,
};

const pgPool = new Pool(pgConfig);

// Função para buscar dados no PostgreSQL (simulada)
async function fetchDataFromPostgres() {
  // Substitua esta lógica simulada pela sua lógica real para buscar dados do PostgreSQL
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Dados do PostgreSQL' });
    }, 1000);
  });
}

// Função para buscar dados no PostgreSQL e armazenar em cache
// Função para buscar dados no PostgreSQL e armazenar em cache
async function fetchDataFromPostgresAndCache(redisCallback) {
    const cacheKey = 'alunos_data';
    let redisClient;
  
    try {
      console.log('Buscando dados no PostgreSQL e armazenando em cache:');
  
      // Inicia o cronômetro para medir o tempo
      const startTimePostgres = Date.now();
      // Cria o cliente Redis
      redisClient = redis.createClient(redisConfig);
  
      // Chama a função de callback para fornecer o cliente Redis à função principal
      redisCallback(redisClient);
  
      // Adiciona log antes de chamar fetchDataFromPostgres
      console.log('Antes de chamar fetchDataFromPostgres');
  
      // Implemente a lógica real para buscar dados do PostgreSQL aqui
      // Substitua a linha abaixo pela sua implementação
      const postgresData = await fetchDataFromPostgres();
  
      // Adiciona log depois de chamar fetchDataFromPostgres
      console.log('Depois de chamar fetchDataFromPostgres');
  
      // Finaliza o cronômetro e calcula o tempo decorrido
      const endTimePostgres = Date.now();
      const timePostgres = endTimePostgres - startTimePostgres;
  
      // Armazena os dados no Redis com um tempo de expiração
      // Substitua a linha abaixo pela sua implementação
      redisClient.set(cacheKey, JSON.stringify(postgresData), 'EX', 60); // Define o tempo de expiração em segundos
      console.log('Dados do PostgreSQL:', postgresData);
  
      // Retorna o tempo decorrido
      return timePostgres;
    } catch (error) {
      console.error('Erro ao buscar dados do PostgreSQL:', error);
      throw error;
    } finally {
      // Garante que o cliente Redis seja encerrado, mesmo em caso de erro
      // Mova a chamada para dentro do bloco try
      if (redisClient) {
        console.log('Finalizando execução de fetchDataFromPostgresAndCache');
        redisClient.quit();
      }
  
      // Garante que o pool do PostgreSQL seja encerrado
      pgPool.end();
    }
  }

// Função para buscar dados do cache (versão simplificada)
async function fetchDataWithCache(redisClient, cacheKey) {
  const getAsync = promisify(redisClient.get).bind(redisClient);

  try {
    console.log('Buscando dados do cache:');
    const startTimeRedis = Date.now();
    const cachedData = await getAsync(cacheKey);
    const endTimeRedis = Date.now();
    const timeRedis = endTimeRedis - startTimeRedis;

    if (cachedData) {
      console.log('Dados do cache:', JSON.parse(cachedData));
    } else {
      console.log('Cache vazio. Precisa buscar dados no PostgreSQL.');
    }

    return timeRedis;
  } catch (error) {
    console.error('Erro ao buscar dados do Redis:', error);
    throw error;
  } finally {
    // Não é necessário fechar o cliente Redis aqui, pois ele é gerenciado na função principal
  }
}

// Função principal
async function main() {
    let redisClient; // Adiciona uma variável para armazenar o cliente Redis
  
    try {
      console.log('Iniciando função principal...');
  
      // Adiciona log antes de chamar fetchDataFromPostgresAndCache
      console.log('Antes de chamar fetchDataFromPostgresAndCache');
  
      // Passa o cliente Redis criado na função fetchDataFromPostgresAndCache
      const timePostgres = await fetchDataFromPostgresAndCache(client => (redisClient = client));
      console.log(`Tempo da consulta no PostgreSQL e armazenamento em cache: ${timePostgres} ms`);
  
      // Substitua 'alunos_data' pela chave que você está usando
      const timeRedis = await fetchDataWithCache(redisClient, 'alunos_data');
      console.log(`Tempo da consulta no Redis (lendo do cache): ${timeRedis} ms`);
    } catch (error) {
      console.error('Erro principal:', error);
    } finally {
      // Move a chamada para redisClient.quit() para cá
      // para garantir que o cliente Redis seja fechado após fetchDataWithCache
      if (redisClient) {
        console.log('Finalizando execução da função principal.');
        redisClient.quit();
      }
    }
  }
  
  // Execute a função principal
  main();
