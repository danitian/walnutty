const LocalStrategy = require('passport-local').Strategy;
const client = require('./database');
const bcrypt = require('bcrypt');

const initialize = (passport) => {
  console.log('Initialized');

  passport.use(
    new LocalStrategy(authenticate)
  )

  passport.serializeUser((userMatch, callback) => callback(null, userMatch.user_id))
  passport.deserializeUser((userId, callback) => {
    const queryStr = `SELECT * FROM users WHERE user_id = $1`;
    const params = [userId]; // need parseint?

    client.query(queryStr, params, (err, data) => {
      if (err) {
        return callback(err); // better err handling
      }

      return callback(null, data.rows[0])
    })
  })
}

const authenticate = (username, password, callback) => {
  const queryStr = `SELECT * FROM users WHERE username = $1`;
  const params = [username];

  client.query(queryStr, params, (err, data) => {
    if (err) {
      return callback(err); // better err handling
    }
    console.log('data.rows: ', data.rows);

    if (data.rows.length > 0) {
      const userMatch = data.rows[0];

      bcrypt.compare(password, userMatch.password_hash, (err, isMatch) => {
        if (err) {
          throw err; // better err handling
        } else if (isMatch) {
          return callback(null, userMatch);
        } else {
          return callback(null, false);
        }
      });
    } else {
      return callback(null, false)
    }
  });
}

module.exports = initialize;