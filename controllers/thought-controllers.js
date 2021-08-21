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
              res.status(400).json({ message: 'No thoughts with this ID'});
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