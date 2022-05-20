const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    socket_origin: ["https://dev.d3v4zrgf3fqesn.amplifyapp.com" ],
    db: process.env.DB || 3001,
}