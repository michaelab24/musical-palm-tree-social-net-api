const router = require('express').Router();
const {
    getUsers,
    // getUsersById,
    // createUsers,
    // updateUsers,
    // deleteUsers,
    // addFriend,
    // deleteFriend
} = require('../../controllers/user-controller')

router.route('/').get(getUsers)

// .post(createUsers);

// router
//   .route('/:id')
//   .get(getUsersById)
//   .put(updateUsers)
//   .delete(deleteUsers);

//   router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;