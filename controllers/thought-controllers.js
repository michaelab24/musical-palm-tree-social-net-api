const { Thought, User } = require('../models')

const thoughtController = {
    
    
    
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
                res.sendStatus(400).json({ message: 'No thoughts with this ID'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    }
}


module.exports = thoughtController;