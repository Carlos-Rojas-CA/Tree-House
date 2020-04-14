const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// define the User model schema
const CharacterSchema = new mongoose.Schema({
  name: String,
  type: String,
  silver: Number,
  stats: {
    level: Number,
    maxhealth: Number,
    currenthealth: Number,
    strength: Number,
    intel: Number,
    speed: Number,
    defense: Number
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});



module.exports = mongoose.model('Character', CharacterSchema);
