const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  desc: {
    type: String
  },
  inProgress: {
    type: Boolean
  },
  isPlanned: {
    type: Boolean
  },
  airPathes: [
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
  groudPathes: [
    
  ],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateStarted: {
    type: Date,
    default: Date.now
  },
  dateFinished: {
    type: Date
  }
});

module.exports = Trip = mongoose.model('trip', TripSchema);