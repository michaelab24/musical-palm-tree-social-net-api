const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      trim: true,
      required: 'Username is Required'
    },

    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/]
      },
});

const User = model('User', UserSchema);

module.exports = User;
