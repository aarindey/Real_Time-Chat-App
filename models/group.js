const mongoose = require("mongoose");
const { StrictEventEmitter } = require("socket.io/dist/typed-events");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  isPersonal: {
    type: Boolean,
    default: false,
  },
});

const Chat = mongoose.model("Group", groupSchema);

module.exports = Chat;
