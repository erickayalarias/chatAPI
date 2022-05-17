const { Server}  = require('socket.io');
const config =require("./config")

function conect(server){
    const io = new Server(server, {
        cors: {
            origin: config.socket_origin,
            credentials: true
        }
    });
    return io
}

module.exports={
    conect
}