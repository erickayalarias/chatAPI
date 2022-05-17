const app = require("../app");
const http = require("http");
const config = require("../config");
const socketIo = require("socket.io");
const serverApp = http.createServer(app);

//Configuration complete of socket
const serverSocket = new socketIo.Server(serverApp, {
  cors: {
    origin: config.socket.origin_reactweb,
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

module.exports = {
  serverSocket,
  serverApp,
};
