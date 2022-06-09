const router = require('express').Router();

const {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend
} = require('../../controllers/user-controller');

//set up GET all and POST at /api/users

router
    .route('/')
    .get(getAllUser)
    .post(createUser);

//set up GET one, PUT, and DELETE at /api/users/:id

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .post(addFriend)
    .delete(deleteUser);

module.exports = router;