const express  = require('express');
const { UserController } = require('../controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/profile', authMiddleware.userAuth, UserController.profile);


module.exports = router;
