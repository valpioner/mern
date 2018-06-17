const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserMapSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  flights: [
    [
      {
        lat: {
          type: Number,
          required: true
        },
        long: {
          type: Number,
          required: true
        },
        name: String,
        desc: String
      }
  ]
  ],
  date: { type: Date, default: Date.now }
});

module.exports = UserMap = mongoose.model('userMap', UserMapSchema);