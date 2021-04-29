const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');

const client = require('../database');
const initializePassport = require('../passportConfig');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.resolve(__dirname, '..', 'public');

initializePassport(passport);

const sess = {
  secret: 'walnutbestnut',
  resave: false,
  saveUninitialized: false
}

app.use(express.static(publicDir));
app.use(express.json());
app.use(morgan('dev'));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('NotAuthenticated');
});

app.get('/api/welcome', (req, res) => {
  res.send('Authenticated');
})

app.post('/api/signup', async (req, res) => {
  const { username, password, fullname } = req.body;
  console.log(req.body);
  console.log('username: ', username);
  console.log('pasword: ', password);
  console.log('fullname: ', fullname);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log('hashed pwd: ', hashedPassword);

  postNewUser(username, hashedPassword, fullname, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('new user added: ', data);
      res.sendStatus(201);
    }
  });
})

const postNewUser = async (username, password, fullname, callback) => {
  let response;
  const queryStr = `INSERT INTO users(username, password_hash, fullname) values ($1, $2, $3);`;
  const params = [username, password, fullname];

  try {
    response = await client.query(queryStr, params);
  } catch(err) {
    throw err; // update this err handling
  };

  callback(null, response);
}

app.post('/api/login', passport.authenticate('local', {
  successRedirect: '/api/welcome',
  failureRedirect: '/'
}))

app.listen(PORT, () => {
  console.log(`Walnutty server running on port ${PORT}`)
})