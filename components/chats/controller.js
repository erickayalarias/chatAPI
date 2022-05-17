const store = require('./store');

function crateChat(users) {
  return new Promise((resolve, reject) => {
    if (!users || !Array.isArray(users)) {
      reject('los datos son icnorrectos');
      return false;
    }
    const chat = {
      users: users,
      lastMessage: new Date(),
    };
    resolve(store.add(chat));
  });
}

upddateChat = (id, data) => {
  return store.update(id, data);
};

function deleteChat(id) {
  return store.delete(id);
}

async function GetChat(id) {
  try {
    const lista = await store.list(id);
    lista.sort((a, b) => {
      return b.lastMessage - a.lastMessage;
    });
    return lista;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  upddateChat,
  crateChat,
  GetChat,
  deleteChat,
};
