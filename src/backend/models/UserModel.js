```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  roles: [{
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Pre-save hook to hash password before saving if it's modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare given password with the hashed one
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update the updated_at field before saving
userSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```