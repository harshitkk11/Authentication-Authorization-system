const express = require('express');

const { Signup, verifyMailer, verifyMail } = require('../controllers/SignUpController');
const { Login } = require('../controllers/LogInController');
const { VerifyToken } = require('../controllers/VerifyToken')
const { GetUser } = require('../controllers/GetUserData');
const { LogOut } = require('../controllers/LogOutController');
const { ResetMail, ResetMailer, ResetPass } = require('../controllers/ResetPassword');

const router = express.Router()

router.post('/signup', Signup, verifyMailer)
router.post('/verify', verifyMail)
router.post('/signin', Login);
router.get('/getuser', VerifyToken, GetUser);
router.get('/logout', VerifyToken, LogOut);
router.post('/reset', ResetMail, ResetMailer);
router.post('/resetpass', ResetPass);

module.exports = router;