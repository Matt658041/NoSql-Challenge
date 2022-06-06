router.route('/:reactionId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router
  .route('/:reactionId/:userId')
  .put(addReply)
  .delete(removeComment);

// /api/comments/user id/ thoughts/ reactions
router.route('/:userId/:thoughtId/:reactionId').delete(removeReply);

module.exports = router;