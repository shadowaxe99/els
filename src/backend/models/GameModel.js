```javascript
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  developer: {
    type: String,
    required: true,
    trim: true
  },
  publisher: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  multiplayerSupport: {
    type: Boolean,
    default: false
  },
  systemRequirements: {
    os: { type: String, required: true },
    processor: { type: String, required: true },
    memory: { type: String, required: true },
    graphics: { type: String, required: true },
    storage: { type: String, required: true }
  },
  ratings: {
    type: [Number],
    default: []
  },
  nftIntegration: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

gameSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const GameModel = mongoose.model('Game', gameSchema);

module.exports = GameModel;
```