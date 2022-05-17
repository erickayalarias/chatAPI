
const { socket } = require("../../socket")
const { upddateChat } = require("../chats/controller")
const store = require("./store")

function addMesage(user,message,chat){
    return new Promise((resolve,reject)=>{
        if(!user|| !message|| !chat){
            reject("los datos son icnorrectos")
            return false
        }
        const fullMessage={
            chat:chat,
            user:user,
            message:message,
            date:new Date()
        }
        store.add(fullMessage)
        upddateChat(chat,fullMessage.date)
        // console.log(socket);
        // const io = socket.conect(server)
        // io.on('connection',(client)=>{
        //     client.emit("message",fullMessage)
        // })
        resolve(fullMessage)
    })
}

function getMessage(filterChat){
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterChat))
    })
}

function deleteMesage(id){
    return new Promise((resolve,reject)=>{
        if(!id){
            reject("los datos son icnorrectos")
            return false
        }
        store.remove(id)
        .then(()=>{
            resolve()
        })
        .catch(err=>{
            reject(err)
        })
    })
}
module.exports={
    addMesage,
    getMessage,
    deleteMesage
}