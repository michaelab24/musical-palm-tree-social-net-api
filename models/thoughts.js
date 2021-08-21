const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought is Required',
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

ThoughtSchema.virtual('reactionCount').get(() => this.reactions.length)

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;