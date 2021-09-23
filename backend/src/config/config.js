const dotenv = require('dotenv');

dotenv.config();

const config = {
  server: {
    port: process.env.PORT,
  },
  jwt: {
    tokenSecret: process.env.TOKEN_SECRET,
    audience: process.env.JWT_AUD,
    issuer: process.env.JWT_ISS,
  },
};

module.exports = config;
