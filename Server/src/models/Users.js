const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
  },    
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;