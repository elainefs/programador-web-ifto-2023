-- MySQL Workbench Synchronization
-- Generated: 2023-11-03 17:45
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Elaine Ferreira

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `pweb_restaurante` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `pweb_restaurante`.`usuarios` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cpf` VARCHAR(11) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `ativo` TINYINT(1) NOT NULL,
  `email_confirmacao` TINYINT(1) NOT NULL,
  `exclusao_data` DATETIME NULL DEFAULT NULL,
  `criacao_data` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  `pessoas_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_pessoas_idx` (`pessoas_id` ASC),
  CONSTRAINT `fk_usuarios_pessoas`
    FOREIGN KEY (`pessoas_id`)
    REFERENCES `pweb_restaurante`.`pessoas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Armazena as pessoas que tem acesso ao sistema';

CREATE TABLE IF NOT EXISTS `pweb_restaurante`.`pessoas` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(125) NOT NULL,
  `cpf` VARCHAR(11) NULL DEFAULT NULL,
  `rg` VARCHAR(20) NULL DEFAULT NULL,
  `rg_expedidor` VARCHAR(100) NULL DEFAULT NULL,
  `telefone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `criacao_data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `alteracao_data` DATETIME NULL DEFAULT NULL,
  `exclusao_data` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `pweb_restaurante`.`produtos` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` TEXT NOT NULL,
  `valor_unitario` VARCHAR(100) NOT NULL,
  `unidade_medida` ENUM("Unidade", "Kilo", "Grama") NOT NULL,
  `criacao_data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `alteracao_data` DATETIME NULL DEFAULT NULL,
  `exclusao_data` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `pweb_restaurante`.`logs` (
  `id` BIGINT(19) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tabela` VARCHAR(100) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `registro_id` BIGINT(20) NOT NULL,
  `tipo_alteracao` ENUM("Insert", "Update", "Delete") NOT NULL,
  `dados_origianais` TEXT NULL DEFAULT NULL,
  `dados_novos` TEXT NULL DEFAULT NULL,
  `exec_data` TIMESTAMP NOT NULL,
  `usuarios_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_logs_usuarios1_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_logs_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `pweb_restaurante`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Logs de alterações';

CREATE TABLE IF NOT EXISTS `pweb_restaurante`.`atendimentos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mesa` INT(11) NULL DEFAULT NULL,
  `pagamento_data` DATETIME NULL DEFAULT NULL,
  `valor_pedidos` FLOAT(11) NULL DEFAULT 0,
  `taxa_servico` FLOAT(11) NULL DEFAULT 0,
  `criacao_data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `alteracao_data` DATETIME NULL DEFAULT NULL,
  `exclusao_data` DATETIME NULL DEFAULT NULL,
  `pessoas_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_atendimentos_pessoas1_idx` (`pessoas_id` ASC),
  CONSTRAINT `fk_atendimentos_pessoas1`
    FOREIGN KEY (`pessoas_id`)
    REFERENCES `pweb_restaurante`.`pessoas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `pweb_restaurante`.`pagamento_tipos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  `criacao_data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `alteracao_data` DATETIME NULL DEFAULT NULL,
  `exclusao_data` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `pweb_restaurante`.`pagamentos` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `atendimentos_id` INT(11) NOT NULL,
  `forma_pagamento_id` INT(11) NOT NULL,
  `valor` FLOAT(11) NOT NULL,
  `criacao_data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `alteracao_data` DATETIME NULL DEFAULT NULL,
  `exclusao_data` DATETIME NULL DEFAULT NULL,
  `observacao` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_atendimentos_has_forma_pagamento_forma_pagamento1_idx` (`forma_pagamento_id` ASC),
  INDEX `fk_atendimentos_has_forma_pagamento_atendimentos1_idx` (`atendimentos_id` ASC),
  CONSTRAINT `fk_atendimentos_has_forma_pagamento_atendimentos1`
    FOREIGN KEY (`atendimentos_id`)
    REFERENCES `pweb_restaurante`.`atendimentos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_atendimentos_has_forma_pagamento_forma_pagamento1`
    FOREIGN KEY (`forma_pagamento_id`)
    REFERENCES `pweb_restaurante`.`pagamento_tipos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `pweb_restaurante`.`pedidos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantidade` INT(11) NOT NULL,
  `valor_unitario` FLOAT(11) NOT NULL,
  `situacao` INT(11) NULL DEFAULT NULL,
  `saida_data` DATETIME NULL DEFAULT NULL,
  `entrega_data` DATETIME NULL DEFAULT NULL,
  `criacao_data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `alteracao_data` DATETIME NULL DEFAULT NULL,
  `exclusao_data` DATETIME NULL DEFAULT NULL,
  `atendimentos_id` INT(11) NOT NULL,
  `produtos_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedidos_atendimentos1_idx` (`atendimentos_id` ASC),
  INDEX `fk_pedidos_produtos1_idx` (`produtos_id` ASC),
  CONSTRAINT `fk_pedidos_atendimentos1`
    FOREIGN KEY (`atendimentos_id`)
    REFERENCES `pweb_restaurante`.`atendimentos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_produtos1`
    FOREIGN KEY (`produtos_id`)
    REFERENCES `pweb_restaurante`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `pweb_restaurante`.`configs` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `criacao_data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `name` VARCHAR(100) NOT NULL,
  `value` VARCHAR(100) NOT NULL,
  `alteracao_data` DATETIME NULL DEFAULT NULL,
  `exclusao_data` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
