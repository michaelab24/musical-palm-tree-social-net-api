const { User, Thought } = require('../models')

const userController = {
    
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    
    getUsers(req, res) {
        User.find({})
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData)
            }).catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getUsersById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate ({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No User found with this ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>  res.json(err));
    },

    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err = res.json(err));
    }
   
}


module.exports = userController;