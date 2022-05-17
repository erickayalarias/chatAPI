
const message = require("../components/message/network")
const user = require("../components/users/network")
const chat = require("../components/chats/network")

const routes = function (server ){
    server.use("/message",message)
    server.use("/user",user)
    server.use("/chat", chat)
}

module.exports=routes