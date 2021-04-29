const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'dantian',
  password: 'postgres',
  database: 'postgres',
  port: 5432,
  max: 20,
});

client.connect((err) => {
  if (err) {
    console.error('Connection error: ', err.stack);
  } else {
    console.log('Connected to postgres database')
  }
});

module.exports = client;
