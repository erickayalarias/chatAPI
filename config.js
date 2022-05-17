const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    socket_origin: process.env.SOCKET_ORIGIN,
    db: process.env.DB,
}