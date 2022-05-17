const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
  publicKey: String,
  GandP: Number,
  avatar: String,
});

const model = mongoose.model('users', mySchema);
module.exports = model;
