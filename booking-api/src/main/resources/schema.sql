CREATE DATABASE IF NOT EXISTS db_booking;
USE db_booking;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    description varchar(250),
    image_url varchar(250) NOT NULL,
    PRIMARY KEY (id)
);
