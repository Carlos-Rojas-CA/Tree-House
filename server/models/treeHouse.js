const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// define the Club model schema
const TreeHouseSchema = new mongoose.Schema({
  name: String,
  controller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  houses: [{
    images: [String],
    price: String,
    description: String,
    comments: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: String
    }]
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});



module.exports = mongoose.model('TreeHouse', TreeHouseSchema);
