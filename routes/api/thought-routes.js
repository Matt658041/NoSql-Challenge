const router = require('express').Router();

const {
    addThought,
    addReaction,
    removeThought,
    removeReaction
} = require('../controllers/thought-controller')

//set up GET all and POST at /api/thoughts

router.route('/:userId').post(addThought);
router.route('/:userId/:thoughtId').put(addReaction);
router.route('/:userId/:thoughtId').delete(removeThought);
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;