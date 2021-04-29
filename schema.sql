DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  fullname VARCHAR(100),
  username VARCHAR(100),
  password_hash TEXT,
  UNIQUE (username)
);

CREATE INDEX username_index ON users(username);