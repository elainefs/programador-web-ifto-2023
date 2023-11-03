-- -- Active: 1699041274909@@127.0.0.1@3306

-- Cria banco de dados
CREATE DATABASE pweb_restaurante
    DEFAULT CHARACTER SET = 'utf8mb4';

-- Define o banco a ser usado
USE pweb_restaurante;

-- Cria tabela configs
CREATE TABLE configs(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  value VARCHAR(100) NOT NULL,
  criacao_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  alteracao_data DATETIME,
  exclusao_data DATETIME
);

-- Mostra as tabelas do banco
SHOW TABLES;

-- Seleciona tudo da tabela configs
SELECT * FROM configs;

-- Mostra todas as colunas da tabela configs
SHOW COLUMNS FROM configs;

-- Cria a tabela produtos
CREATE TABLE produtos(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  valor_un FLOAT NOT NULL,
  unidade_medida ENUM('Unidade', 'Kilo', 'Grama'),
  criacao_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  alteracao_data DATETIME,
  exclusao_data DATETIME
);

-- Cria tabela pessoas
CREATE TABLE pessoas(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  cpf VARCHAR(11),
  rg VARCHAR(20),
  rg_expedidor VARCHAR(100),
  email VARCHAR(100),
  criacao_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  alteracao_data DATETIME,
  exclusao_data DATETIME
);

-- Altera coluna name da tabela pessoas
ALTER TABLE pessoas
MODIFY COLUMN nome VARCHAR(125);

-- Cria tabela atendimentos
CREATE TABLE atendimento(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pessoas_id INT UNSIGNED NULL,
  mesa INT,
  pagamento_data DATETIME,
  valor_pedido FLOAT,
  taxa_servico FLOAT,
  criacao_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  alteracao_data DATETIME,
  exclusao_data DATETIME,
  FOREIGN KEY(pessoas_id) REFERENCES pessoas(id)
);

CREATE TABLE pedidos(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  atendimentos_id INT UNSIGNED NULL,
  produtos_id INT UNSIGNED NULL,
  quantidade INT NOT NULL,
  valor_un FLOAT NOT NULL,
  situacao ENUM('Pedido', 'Produção', 'Entrega', 'Entregue') NOT NULL DEFAULT 'Entregue',
  saida_data DATETIME,
  entrega_data DATETIME,
  criacao_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  alteracao_data DATETIME,
  exclusao_data DATETIME,
  FOREIGN KEY(atendimentos_id) REFERENCES atendimento(id),
  FOREIGN KEY(produtos_id) REFERENCES produtos(id)
);