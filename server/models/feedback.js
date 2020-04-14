const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// define the User model schema
const FeedBackSchema = new mongoose.Schema({
  
  feedback: String,
  checked: {
      type: Boolean,
      default: false
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});



module.exports = mongoose.model('FeedBack', FeedBackSchema);
