const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    socket_origin: ["cabal-two.vercel.app"],
    db: process.env.DB || 3001,
}