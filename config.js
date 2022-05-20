const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    socket_origin: ["https://genuine-cupcake-017956.netlify.app"],
    db: process.env.DB || 3001,
}