const express = require('express');
const jwt = require('jsonwebtoken');
const { LOCAL, JWT } = require('./config');
const cry = require('crypto').randomBytes(64).toString('hex');

console.log(crypto) // saving this string to env as the secret for jwt
const PORT = process.env.PORT || LOCAL;
const app = express();

function generateAccessToken(username) {
  return jwt.sign(username, JWT.SECRET, { expiresIn: '1800s' });
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.sendStatus(401)
  }

  jwt.verify(token, JWT.SECRET, (err, user) => {
    console.log(err)

    if (err) {
      return res.sendStatus(403)
    }

    req.user = user

    next()
  })
}

app.post('/api/createNewUser', (req, res) => {
  // ...

  const token = generateAccessToken({ username: req.body.username });
  res.json(token);

  // ...
});



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));