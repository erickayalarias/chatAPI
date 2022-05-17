const model = require('./model');

function update(id, data) {
  return new Promise((resolve, reject) => {
    if (!id || !data) {
      reject('los datos son icnorrectos');
      return false;
    }
    model.findByIdAndUpdate(id, { lastMessage: data }, (err, pop) => {
      if (err) {
        reject(err);
      }
      resolve(pop);
    });
  });
}

function crateChatToDB(user) {
  const myChat = new model(user);
  myChat.save();
}
function deleteChatDB(id) {
  return model.findByIdAndDelete(id);
}

function getchat(id) {
  return new Promise((res, rej) => {
    let filter = {};
    if (id) {
      filter = { users: id };
    }
    model
      .find(filter)
      .populate('users')
      .exec((err, pop) => {
        if (err) {
          rej(err);
          return false;
        }
        res(pop);
      });
  });
}

function getOneChat(id) {
  return new Promise((res, rej) => {
    model
      .findById(id)
      .populate('users')
      .exec((err, pop) => {
        if (err) {
          rej(err);
          return false;
        }
        res(pop);
      });
  });
}

module.exports = {
  add: crateChatToDB,
  list: getchat,
  update,
  delete: deleteChatDB,
  getOne: getOneChat,
};
