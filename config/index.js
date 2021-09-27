require('dotenv').config();
module.exports = {
  LOCAL: process.env.PORT,
  JWT: {
    SECRET: process.env.TOKEN_SECRET
  }
}