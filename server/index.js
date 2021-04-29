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


app.use(express.static(publicDir));

initializePassport(passport);

const sess = {
  secret: 'walnutbestnut',
  resave: false,
  saveUninitialized: false
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('NotAuthenticated');
});

app.get('/api/checkauth', (req, res) => {
  if (req.isAuthenticated()) {
    res.send({
      authStatus: 'Authenticated',
      user: req.user
    });
  }
})

app.get('/api/welcome', (req, res) => {
  res.send('Authenticated');
})

app.post('/api/signup', async (req, res) => {
  const { username, password, fullname } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  postNewUser(username, hashedPassword, fullname, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
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
    throw err;
  };

  callback(null, response);
}

app.post('/api/login', passport.authenticate('local', {
  successRedirect: '/api/welcome',
  failureRedirect: '/'
}))

app.get('/api/logout', (req, res) => {
  req.logout();
  res.send('logged out');
})

app.listen(PORT, () => {
  console.log(`Walnutty server running on port ${PORT}`)
})