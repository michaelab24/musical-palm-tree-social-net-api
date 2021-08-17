const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: 'Reaction is Required',
        maxLength: 280
    },
    username: {
        type: String,
        trim: true,
        required: 'Username is Required'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;