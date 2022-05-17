const { add, get, update } = require('./store');

function addUser(user) {
  if (!user.name || !user.publicKey || !user.GandP || !user.avatar) {
    return Promise.reject('invalid info'); //promesa rechazada
  }
  return add(user);
}

function getUsers(filter) {
  return new Promise((res, req) => {
    res(get(filter));
  });
}

function updateUsers(data) {
  return new Promise((res, req) => {
    const {filter,updateData} = data.body
    res(update(filter,updateData));
  });
  
}

module.exports = {
  addUser,
  getUsers,
  updateUsers
};
