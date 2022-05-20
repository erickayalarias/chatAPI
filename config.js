const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    socket_origin: process.env.SOCKET_ORIGIN || 'https://cabal-erickayalarias.vercel.app/',
    db: process.env.DB || 3001,
}