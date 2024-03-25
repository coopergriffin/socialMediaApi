//Cooper Griffin 
//March 25th 2024
//Defines api routes for user model

const router = require('express').Router();

const {

  createUser,

  getAllUsers,

  getUserById,

  updateUser,

  deleteUser,

  addFriend,

  removeFriend

} = require('../controllers/userController');


// User routes

router.route('/').post(createUser).get(getAllUsers);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;