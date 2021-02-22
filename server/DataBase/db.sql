DROP DATABASE IF EXISTS inco;
CREATE DATABASE inco;

\c inco;

CREATE TABLE users(
  ID SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);

INSERT INTO users (name, email,password)
  VALUES ('Moe', 'moe@gmail.com','asdasdas');