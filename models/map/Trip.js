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