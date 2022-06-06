const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
  } = require('../../controllers/thought-controller');
  
  // /api/thoughts
  router
    .route('/')
    .get(getAllThought)
    .post(createThought);
  
  // /api/thoughts/:id
  router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/<Id>/<userId>
router
  .route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction);

// /api/comments/user id/ thoughts/ reactions
router.route('/:thoughtId/reactions/:reactionId');

module.exports = router;