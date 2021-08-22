const router = require('express').Router();
const {
    createThought,
    deleteThought,
    getThoughts,
    getThoughtById,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controllers')

router
.route('/').get(getThoughts)

router
.route('/:userId')
.post(createThought);

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction)

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)


module.exports = router;