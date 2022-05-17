const model = require("./model")

function addUser(user){
    const myUser = new model(user)
    return myUser.save()
}

function getusers(filter){
    return model.find(filter)
}
function updateUsers(filter,data){
    console.log("filter",filter);
    console.log("data",data);
    
    model.findByIdAndUpdate(filter,data)
    .then(data=>{
        console.log("final data",data);
        return data
    })
    .catch(err=>{
        console.log(err);
        return err
    })
}

module.exports={
    add: addUser,
    get:getusers,
    update:updateUsers
}