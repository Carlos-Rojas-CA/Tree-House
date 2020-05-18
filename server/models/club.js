const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// define the Club model schema
const ClubSchema = new mongoose.Schema({
  name: String,
  // type: String,
  // silver: Number,
  // stats: {
  //   level: Number,
  //   maxhealth: Number,
  //   currenthealth: Number,
  //   strength: Number,
  //   intel: Number,
  //   speed: Number,
  //   defense: Number
  // },
  users:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});



module.exports = mongoose.model('Club', ClubSchema);
