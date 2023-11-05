const mongoose = require("mongoose");

const conn = mongoose.createConnection('mongodb://0.0.0.0:27017/url');
conn.on('connected', () => {
  console.log('Mongoose connected mongodb');
});
conn.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = conn.model('User', userSchema);

module.exports = {
    User
  }; 