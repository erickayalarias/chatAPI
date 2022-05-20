const axios = require("axios");
//librerias
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");

//funciones de otros ficheros
const { conect, key } = require("./db");
const router = require("./network/routers");
const socket = require("./socket");
const { argv } = require("process");
const { getOne } = require("./components/chats/store");
const updateNotification = require("./sockets/helpers");

async function conectdb() {
  await conect(key);
}
conectdb();
app.use(bodyParser.json());
app.use(cors());

const io = socket.conect(server);
io.on("connect", (socket) => {

  socket.on("message", (arg, callback) => {
    console.log("messageA");
    (async () => {
      console.log("B");
      const chat = await getOne(arg.chat);
      const otherUser = chat.users.find((user) => {
        const id = user._id.toString().split('"');
        return id[0] !== arg.user;
      });
      console.log("C");
      const data = {
        uid: otherUser.publicKey,
        publicKey: otherUser.publicKey,
        data: {
          images: [],
        },
      };
      console.log("D");
      axios
          .post('https://mongocabal.herokuapp.com/api/v1/finduser', {
              uid: otherUser.publicKey,
              publicKey: otherUser.publicKey,
          })
        .then((res) => {
          console.log("E");
              data.data.images = res.data.data.images;
              data.data.images[0] = data.data.images[0] + 1;
              axios
                  .patch('https://mongocabal.herokuapp.com/api/v1/users', data).then((res)=> console.log("F"))
          });
    })();
    console.log("G");
    io.emit("DEVUELTA", arg);
    io.emit('notificacionesChat', arg.chat);
  });
});

router(app);

const PORT = process.env.PORT || 3001;

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

server.listen(process.env.PORT, function () {
  console.log("Servidor corriendo en el puerto 3001");
});
