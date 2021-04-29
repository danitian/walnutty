const { Client } = require('pg');

const client = new Client({
  host: '54.147.21.125',
  user: 'postgres',
  password: 'kK9wI4oK1eH2nR3tN3qK2nS3cS9tN5wE',
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
