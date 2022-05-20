const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    socket_origin: ["frolicking-mandazi-cc8caa.netlify.app"],
    db: process.env.DB || 3001,
}