const express = require("express")
const response = require("../../network/responseModule")// tipos de respuesta
const controller = require("./controller")//funciones
const router= express.Router()

router.get("/",function(req,res){
    const filterMessage = req.query.user || null
    let filter ={}
    if(filterMessage !== "undefined"){
        filter={
            publicKey: filterMessage
        }
    }
    controller.getUsers(filter)
        .then((data)=>{
            response.success(req,res,data,201)
        })
        .catch((err)=>{
            response.error(req,res,"internal error",500)
        })
})

router.post("/",function (req,res){
    // console.log(req.body);
    controller.addUser(req.body)
        .then(data => {
            response.success(req,res,data,201)
        })
        .catch(err=>{
            response.error(req,res,"internal error",500)
        })
})
router.patch("/",function (req,res){

    controller.updateUsers(req,res)
        .then(data => {
            response.success(req,res,data,201)
        })
        .catch(err=>{
            response.error(req,res,"internal error",500)
        })
})

module.exports= router