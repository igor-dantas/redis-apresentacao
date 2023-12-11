-- Criação da tabela alunos
CREATE TABLE IF NOT EXISTS alunos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100)
);

-- Inserção de dados fictícios na tabela alunos
INSERT INTO alunos (nome) VALUES ('João Silva');
INSERT INTO alunos (nome) VALUES ('Maria Oliveira');
INSERT INTO alunos (nome) VALUES ('Pedro Santos');
INSERT INTO alunos (nome) VALUES ('Ana Costa');
INSERT INTO alunos (nome) VALUES ('Lucas Pereira');
INSERT INTO alunos (nome) VALUES ('Fernanda Lima');
INSERT INTO alunos (nome) VALUES ('Ricardo Oliveira');
INSERT INTO alunos (nome) VALUES ('Juliana Martins');
INSERT INTO alunos (nome) VALUES ('Marcos Oliveira');
INSERT INTO alunos (nome) VALUES ('Carla Silva');
