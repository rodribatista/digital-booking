SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema booking_hotel
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `booking_hotel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `booking_hotel` ;

-- -----------------------------------------------------
-- Table `booking_hotel`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`countries` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(2) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_5dhgnik9p8t72kaktdb8kd8dt` (`code` ASC) VISIBLE,
  UNIQUE INDEX `UK_1pyiwrqimi3hnl3vtgsypj5r` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`cities` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `country_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_l61tawv0e2a93es77jkyvi7qa` (`name` ASC) VISIBLE,
  INDEX `FK6gatmv9dwedve82icy8wrkdmk` (`country_id` ASC) VISIBLE,
  CONSTRAINT `FK6gatmv9dwedve82icy8wrkdmk`
    FOREIGN KEY (`country_id`)
    REFERENCES `booking_hotel`.`countries` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`addresses` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(10) NOT NULL,
  `street` VARCHAR(100) NOT NULL,
  `city_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK9fkb8qaj71tiyr9htkmn7r8y5` (`city_id` ASC) VISIBLE,
  CONSTRAINT `FK9fkb8qaj71tiyr9htkmn7r8y5`
    FOREIGN KEY (`city_id`)
    REFERENCES `booking_hotel`.`cities` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_nodjpaox51kclukt7yi0hf6qf` (`title` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `role_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_6dotkott2kjsp8vw4d0m25fb7` (`email` ASC) VISIBLE,
  INDEX `FKp56c1712k691lhsyewcssf40f` (`role_id` ASC) VISIBLE,
  CONSTRAINT `FKp56c1712k691lhsyewcssf40f`
    FOREIGN KEY (`role_id`)
    REFERENCES `booking_hotel`.`roles` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  `image_url` VARCHAR(250) NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_tkwloef0k6ccv94cipgnmvma8` (`title` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`products` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `availability` BIT(1) NULL DEFAULT NULL,
  `description` VARCHAR(1250) NULL DEFAULT NULL,
  `title` VARCHAR(50) NOT NULL,
  `address_id` BIGINT NOT NULL,
  `category_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_ey5iubxah52tpxgs5ngc7xy7y` (`address_id` ASC) VISIBLE,
  INDEX `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id` ASC) VISIBLE,
  CONSTRAINT `FK5x0dxcwl286wp420yw1vhdxy7`
    FOREIGN KEY (`address_id`)
    REFERENCES `booking_hotel`.`addresses` (`id`),
  CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9`
    FOREIGN KEY (`category_id`)
    REFERENCES `booking_hotel`.`categories` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`bookings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`bookings` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `arrived_time` TIME NOT NULL,
  `date_checkin` DATE NOT NULL,
  `date_checkout` DATE NOT NULL,
  `product_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKlmdmerb98p3rhxcmvc9iunj2d` (`product_id` ASC) VISIBLE,
  INDEX `FKeyog2oic85xg7hsu2je2lx3s6` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKeyog2oic85xg7hsu2je2lx3s6`
    FOREIGN KEY (`user_id`)
    REFERENCES `booking_hotel`.`users` (`id`),
  CONSTRAINT `FKlmdmerb98p3rhxcmvc9iunj2d`
    FOREIGN KEY (`product_id`)
    REFERENCES `booking_hotel`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`features` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_e7oj9om091i06mxvb9h84968w` (`title` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`images` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(250) NOT NULL,
  `product_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKghwsjbjo7mg3iufxruvq6iu3q` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FKghwsjbjo7mg3iufxruvq6iu3q`
    FOREIGN KEY (`product_id`)
    REFERENCES `booking_hotel`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `booking_hotel`.`product_has_features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking_hotel`.`product_has_features` (
  `product_id` BIGINT NOT NULL,
  `feature_id` BIGINT NOT NULL,
  INDEX `FKatvj5n2g0scsy3w62lc3pk8rg` (`feature_id` ASC) VISIBLE,
  INDEX `FKhkps2og9oos7tqyehfgxq3r74` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FKatvj5n2g0scsy3w62lc3pk8rg`
    FOREIGN KEY (`feature_id`)
    REFERENCES `booking_hotel`.`features` (`id`),
  CONSTRAINT `FKhkps2og9oos7tqyehfgxq3r74`
    FOREIGN KEY (`product_id`)
    REFERENCES `booking_hotel`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;