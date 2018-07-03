const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AirPathSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  trip: {
    type: Schema.Types.ObjectId,
    required: 'trips'
  },
  waypoints: [
    {
      lat: {
        type: Number
      },
      lng: {
        type: Number
      },
      address: {
        type: String
      }
    }
  ],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = AirPath = mongoose.model('airPath', AirPathSchema);