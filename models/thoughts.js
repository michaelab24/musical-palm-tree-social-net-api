const { Schema, Types, model } = require('mongoose');
const moment = require('moment');

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
    
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
},{
        toJSON: {
            getters: true,
            },
            id: false
    
});

const ThoughtSchema = new Schema({
    
    thoughtText: {
        type: String,
        required: 'Thought is Required',
        minLength: 1,
        maxLength: 280
    },
    
    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    
    reactions: [ReactionSchema]
},{
    toJSON: {
        getters: true,
        virtuals: true
    },id: false, 
});

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

// ThoughtSchema.virtual('reactionCount').get(() => this.reactions.length)

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;