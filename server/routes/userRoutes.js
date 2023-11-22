const express = require('express');

const { Signup, 
    Login, 
    verifyToken,
    getUser,
    refreshToken,
    logout,
    verifyMail,
    ResetMail,
    ResetPass} = require('../controllers/userController')

const { verifyMailer, resetMailer } = require('../controllers/mailer')

const router = express.Router()

router.post('/signup', Signup, verifyMailer)
router.post('/verify', verifyMail)
router.post('/login', Login, verifyToken, getUser)
router.get('/refresh', refreshToken, verifyToken, getUser)
router.post('/logout', verifyToken, logout)
router.post('/reset', ResetMail, resetMailer)
router.post('/resetpass', ResetPass)

module.exports = router;