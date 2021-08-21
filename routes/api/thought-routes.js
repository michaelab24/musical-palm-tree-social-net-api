const router = require('express').Router();
const {
    // addThought,
    // deleteThought,
    // addReaction,
    // deleteReaction,
    getThoughts,
    getThoughtById,
    // updateThought,
    // updateReaction
} = require('../../controllers/thought-controllers')

router.route('/').get(getThoughts);

router
.route('/:id')
.get(getThoughtById)
// .put(updateUser)
// .delete(deleteUser);

module.exports = router;