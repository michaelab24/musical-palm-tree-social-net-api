const { User, Thought } = require('../models')

const userController = {
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData)
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
}


module.exports = userController;