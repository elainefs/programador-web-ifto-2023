-- Active: 1699041274909@@127.0.0.1@3306@pweb_restaurante
USE pweb_restaurante;

SHOW TABLES;

SHOW COLUMNS FROM pessoas;

INSERT INTO pessoas(nome, telefone, email)
VALUES('Elaine Ferreira', '12399999999', 'elaine.ferreira@ifto.edu.br');

SELECT * FROM pessoas;

UPDATE pessoas SET cpf = '11111111111' WHERE id = 1;