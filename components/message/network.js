const express = require("express")
const response = require("../../network/responseModule")// tipos de respuesta
const controller = require("./controller")//funciones


const router= express.Router()
//rutas  mensajes
router.get("/",(req,res)=>{
    const filterMessage = req.query.chat || null
    controller.getMessage(filterMessage)
        .then(message =>{
            response.success(req,res,message)
        })
        .catch(err=>{
            response.error(req,res, "informacion invalida",500)
        })
})
router.post("/",(req,res)=>{
    const body = req.body
    controller.addMesage(body.user, body.message,body.chat)
        .then((fullMessage)=>{
            response.success(req,res,fullMessage,201)
        })
        .catch(e=>{
            console.log("error",e);
            response.error(req,res, "informacion invalida",500)})
})

router.delete("/:id",(req,res)=>{
    controller.deleteMesage(req.params.id)
        .then(message =>{
            response.success(req,res,"se elimino correctamente",200)
        })
        .catch(err=>{
            response.error(req,res, "informacion invalida",500)
        })
})

module.exports= router