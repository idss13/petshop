-- SCRIPTS

--Alteração de senha do root
ALTER USER 'root'@'localhost' INDENTIFIED WITH mysql_native_password BY 'nova senha';

--CRIA UM SCHEMA
DROP SCHEMA `store`;

--CRIA UM SCHEMA
CREATE SCHEMA `store`;

--CRIA UM SCHEMA
USE SCHEMA `store`;

--CRIA UMA TABELA
CREATE TABLE `store`.`produtos`(
    `id` INT NOT NULL,
    `titulo` VARCHAR(80) NULL,
    `descricao` TEXT(4000) NULL,
    PRIMARY KEY (`id`));
