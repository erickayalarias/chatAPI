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
    console.log("message", arg);
    (async () => {
      const chat = await getOne(arg.chat);
      const otherUser = chat.users.find((user) => {
        const id = user._id.toString().split('"');
        return id[0] !== arg.user;
      });
      const data = {
        uid: otherUser.publicKey,
        publicKey: otherUser.publicKey,
        data: {
          images: [],
        },
      };
      axios
          .post('https://mongocabal.herokuapp.com/api/v1/finduser', {
              uid: otherUser.publicKey,
              publicKey: otherUser.publicKey,
          })
          .then((res) => {
            if (!res.data.data.images.includes(null) || res.data.data.images.length > 2) {
              console.log("esta bien",res);
              data.data.images = res.data.data.images;
            }else{
              data.data.images = [0,0,0];
            }
              data.data.images[0] = data.data.images[0] + 1;
              axios
                  .patch('https://mongocabal.herokuapp.com/api/v1/users', data).then((data)=>{console.log("hola mundo",data)})
          });
    })();
    io.emit("DEVUELTA", arg);
    io.emit('notificacionesChat', arg.chat);
  });

  socket.on("friends", (arg, callback) => {
    console.log("friends", arg);
    (async () => {
      const data = {
        uid: arg.recipientPublicKey,
        publicKey: arg.recipientPublicKey,
        data: {
          images: [],
        },
      };
      axios
          .post('https://mongocabal.herokuapp.com/api/v1/finduser', {
              uid: arg.recipientPublicKey,
              publicKey: arg.recipientPublicKey,
          })
          .then((res) => {
            if(!res.data.data.images.includes(null) || res.data.data.images.length > 2){
              data.data.images = res.data.data.images;
            }else{
              data.data.images = [0,0,0];
            }
              data.data.images[2] = data.data.images[2] + 1;
              axios
                  .patch('https://mongocabal.herokuapp.com/api/v1/users', data).then(console.log("hola mundo"))
          });
  })();
    io.emit('notificacionesFriends', arg);
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
