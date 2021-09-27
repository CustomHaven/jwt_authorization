const express = require('express');
const jwt = require('jsonwebtoken');
const { LOCAL, JWT } = require('./config');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || LOCAL;
const app = express();

const isAuthorized = (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    let token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, JWT.SECRET, { algorithms: 'HS256' }, (err, decode) => {
      if (err) {
        return res.status(401).json({ error: 'Not Authorized' })
      }

      console.log(decode)
      next();
    });
  } else {
    res.status(401).json({ error: 'Not Authorized'})
  }
}

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/secret', isAuthorized, (req, res) => {
  res.json({ "message": "Super Secret Message" })
});

app.get('/readme', (req, res) => {
  res.json({ "message": "Hello World! READ ME!" })
});

app.get('/jwt', (req, res) => {
  // let privateKey = JWT.SECRET;
  let token = jwt.sign({body: 'stuff'}, JWT.SECRET, { algorithm: 'HS256' })
  res.send(token)
});



app.listen(PORT, () => console.log(`Server is running on this URL http://localhost:${PORT}`));