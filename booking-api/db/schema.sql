-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_booking
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_booking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_booking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `db_booking` ;

-- -----------------------------------------------------
-- Table `db_booking`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_booking`.`countries` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_booking`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_booking`.`cities` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `country_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK6gatmv9dwedve82icy8wrkdmk` (`country_id` ASC) VISIBLE,
  CONSTRAINT `FK6gatmv9dwedve82icy8wrkdmk`
    FOREIGN KEY (`country_id`)
    REFERENCES `db_booking`.`countries` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_booking`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_booking`.`addresses` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(255) NULL DEFAULT NULL,
  `street` VARCHAR(255) NULL DEFAULT NULL,
  `city_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK9fkb8qaj71tiyr9htkmn7r8y5` (`city_id` ASC) VISIBLE,
  CONSTRAINT `FK9fkb8qaj71tiyr9htkmn7r8y5`
    FOREIGN KEY (`city_id`)
    REFERENCES `db_booking`.`cities` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_booking`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_booking`.`categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_booking`.`features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_booking`.`features` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_booking`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_booking`.`products` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `availability` BIT(1) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `address_id` BIGINT NULL DEFAULT NULL,
  `categories_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK5x0dxcwl286wp420yw1vhdxy7` (`address_id` ASC) VISIBLE,
  INDEX `FKgro094vh0dp0tly1225wk8u37` (`categories_id` ASC) VISIBLE,
  CONSTRAINT `FK5x0dxcwl286wp420yw1vhdxy7`
    FOREIGN KEY (`address_id`)
    REFERENCES `db_booking`.`addresses` (`id`),
  CONSTRAINT `FKgro094vh0dp0tly1225wk8u37`
    FOREIGN KEY (`categories_id`)
    REFERENCES `db_booking`.`categories` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_booking`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_booking`.`images` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NULL DEFAULT NULL,
  `producto_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK2qty0rxjl77o9udosj4em7mrm` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `FK2qty0rxjl77o9udosj4em7mrm`
    FOREIGN KEY (`producto_id`)
    REFERENCES `db_booking`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_booking`.`product_has_features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_booking`.`product_has_features` (
  `product_id` BIGINT NOT NULL,
  `features_id` BIGINT NOT NULL,
  PRIMARY KEY (`product_id`, `features_id`),
  INDEX `FKhop3mw2hkpqupxkpoca8ppj0w` (`features_id` ASC) VISIBLE,
  CONSTRAINT `FKhkps2og9oos7tqyehfgxq3r74`
    FOREIGN KEY (`product_id`)
    REFERENCES `db_booking`.`products` (`id`),
  CONSTRAINT `FKhop3mw2hkpqupxkpoca8ppj0w`
    FOREIGN KEY (`features_id`)
    REFERENCES `db_booking`.`features` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
