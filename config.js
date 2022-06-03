const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    socket_origin: ["https://master.d2fqeyy4jeexdr.amplifyapp.com" ],
    db: process.env.DB || 3001,
}