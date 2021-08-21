const router = require('express').Router();
const {
    createThought,
    // deleteThought,
    // addReaction,
    // deleteReaction,
    getThoughts,
    getThoughtById,
    // updateThought,
    // updateReaction
} = require('../../controllers/thought-controllers')

router.route('/').get(getThoughts)
.post(createThought);

router
.route('/:id')
.get(getThoughtById)
// .put(updateUser)
// .delete(deleteUser);

module.exports = router;