const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    socket_origin: ["cabal-i4nf08rsu-erickayalarias.vercel.app"],
    db: process.env.DB || 3001,
}