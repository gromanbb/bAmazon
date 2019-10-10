/* Schema for SQL database/table */
DROP DATABASE IF EXISTS bAmazon_db;

/* Create database */
CREATE DATABASE bAmazon_db;
USE bAmazon_db;

/* Create table */
CREATE TABLE products (
  item_id INTEGER(4) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(6, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

/* Insert 10 Rows into products table */
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pokemon: Let's Go, Pikachu!", "Apps & Games", 44.64, 8),
("Xbox One S 1TB Console - Star Wars Jedi: Fallen Order Bundle", "Video Games", 299.00, 1),
("Star Wars Jedi: Fallen Order - PlayStation 4", "Apps & Games", 59.99, 4),
("ROGUE ONE: A STAR WARS STORY (3D)", "Movies & TV", 34.95, 11),
("Hollywood's Bleeding - Post Malone", "CDs & Vinyl", 11.90, 6),
("Carnival Row: Tangle in the Dark", "Audible Books & Originals", 7.83, 2),
("Spider-Man: Far from Home (DVD)", "Movies & TV", 19.96, 7),
("Girl, Stop Apologizing - Rachel Hollis", "Audible Books & Originals", 23.95, 2),
("Father of All - Green Day", "CDs & Vinyl", 14.98, 8),
("Nintendo NES Classic Edition Game", "Video Games", 95.95, 5);