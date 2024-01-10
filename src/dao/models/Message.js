const mongoose = require('mongoose');
const dbConnection = require('../../db.js');
const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
  // Otros campos si los tienes...
});

module.exports = mongoose.model('Message', messageSchema);
