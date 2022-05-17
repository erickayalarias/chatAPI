const model = require("./model")



function addMesageToDB(message){
    const myMessage = new model(message)
    myMessage.save()
}

async function getMessages(filterChat){
    return new Promise((resolve,reject)=>{
    let filter ={}
    if(filterChat !== null){
        filter = {chat:filterChat}
    }
    model.find(filter)
        .populate("user")
        .exec((err,messages)=>{
            if(err){
                reject(err)
                return false
            }
            resolve(messages)
        })
    })
}

function removeMessage(id){
    return model.deleteOne({_id:id})
}

module.exports={
    add:addMesageToDB,
    list:getMessages,
    remove:removeMessage
}