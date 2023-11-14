```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isNFT: {
    type: Boolean,
    default: false
  },
  nftMetadata: {
    tokenID: {
      type: String,
      default: null
    },
    contractAddress: {
      type: String,
      default: null
    },
    transactionHash: {
      type: String,
      default: null
    }
  }
}, {
  timestamps: true
});

productSchema.methods.toJSON = function() {
  const product = this;
  const productObject = product.toObject();

  delete productObject.__v;

  return productObject;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
```