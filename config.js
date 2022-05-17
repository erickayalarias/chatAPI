const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    socket_origin: process.env.SOCKET_ORIGIN || 'http://localhost:3000',
    db: process.env.DB || 3001,
}