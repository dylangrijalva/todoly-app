const dotenv = require('dotenv');

dotenv.config();

const config = {
    server: {
        port: process.env.PORT
    }
};

module.exports = config;