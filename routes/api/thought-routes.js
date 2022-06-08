const router = require('express').Router();

const {
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
  } = require('../../controllers/thought-controller');
  
  // /api/thoughts aka comments
  router
    .route('/')
    .post(createThought);
  
  // /api/thoughts/:id
  router
    .route('/:id')
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/<Id>/<userId>
router
  .route('/:thoughtId/reactions')
  .post(createReaction);
  

// /api/comments/user id/ thoughts/ reactions 
router.route('/:thoughtId/reactions/:reactionId')
      .delete(deleteReaction);
module.exports = router;