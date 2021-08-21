const router = require('express').Router();
const {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

router.route('/').get(getUsers)
.post(createUser);

router
.route('/:id')
.get(getUsersById)
.put(updateUser)
.delete(deleteUser);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;