const db = require("mongoose")
const config = require("./config")

const key = config.db
async function conect(url){
    await db.connect(url,{
        useNewUrlParser:true,
    })
    console.log("base de datos conectada");
}

module.exports={
    conect,
    key
}