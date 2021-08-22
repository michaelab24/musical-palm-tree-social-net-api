const { Thought, User } = require('../models')

const thoughtController = {
    
    createThought({ params, body }, res) {
        console.log(params);
        Thought.createThought(body)
        .then(({_id}) => {
            return Thought.findOneAndUpdate(
                { _id: params.thoughtID },
                { $push: { thought: _id} },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            console.log(dbThoughtData);
            if(!dbThoughtData) {
              res.status(400).json({ message: 'No thoughts found with this ID'});
              return;  
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    
    getThoughts(req, res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((dbThoughtData) => {
            res.json(dbThoughtData)
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'rections', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.sendStatus(400).json({ message: 'No thoughts found with this ID'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this ID'});
                return;
            }
                res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this ID'});
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thought found with this ID'});
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
    
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this ID'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }

}


module.exports = thoughtController;