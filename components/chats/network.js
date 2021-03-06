const express = require("express")
const response = require("../../network/responseModule")// tipos de respuesta
const controller = require("./controller")//funciones

const router= express.Router()

router.get("/:id", (req, res) => {
    const id = req.params.id
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
            response.error(req,res, "informacion invalida",500)})
})

module.exports= router