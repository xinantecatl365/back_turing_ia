const { Router } = require('express');
const { createUser, loginUser, signOutUser } = require('../controllers/usersControllers');
const cookieParser = require('cookie-parser');

const router = Router();
router.use(cookieParser());
const createUserR = '/users/create';
const loginUserR = '/users/login';

// need to create middleware to verify fields in all routes

router.post(createUserR, createUser);
router.post(loginUserR, loginUser);

module.exports = router;