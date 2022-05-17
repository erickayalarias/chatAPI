const express = require("express")
const response = require("../../network/responseModule")// tipos de respuesta
const controller = require("./controller")//funciones

const router= express.Router()

router.get("/:id", (req, res) => {
    consolr.log("hola")

    const id = req.params.id

    console.log(id);
    controller.GetChat(id)
        .then(message =>{
            response.success(req,res,message)
        })
        .catch(err=>{
            response.error(req,res, "informacion invalida",500)
        })
})

router.delete("/:id",(req,res)=>{
    const id = req.params.id
    controller.deleteChat(id)
        .then(message =>{
            response.success(req,res,"se elimino correctamente")
        })
        .catch(err=>{
            response.error(req,res, "informacion invalida",500)
        })
})
router.post("/",(req,res)=>{
    controller.crateChat(req.body)
        .then((fullMessage)=>{
            response.success(req,res,fullMessage,201)
        })
        .catch(e=>{
            // console.log("error",e);
            response.error(req,res, "informacion invalida",500)})
})

module.exports= router