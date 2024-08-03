const mongoose = require('mongoose');
const { hashPassword } = require('../utils/passwordHashing');
const {matchPassword}= require('../utils/matchPassword');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {validator: validator.isEmail}
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User' }],
        
    follows: [{
        type: Schema.Types.ObjectId,
        ref: 'User' }],

    bio: { type: String },

    },
    { timestamps: true});

// Middleware pour hasher le mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await hashPassword(this.password);
  next();
});

// Méthode pour comparer le mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await matchPassword(enteredPassword, this.password);
};

userSchema.methods.isAdmin= async function(){
    return this.role === 'admin';
}
const User = mongoose.model('User', userSchema);

module.exports = User;
