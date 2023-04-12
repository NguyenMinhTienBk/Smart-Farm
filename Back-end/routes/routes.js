const express = require('express');

const router = express.Router();
const { createUser, userSignIn } = require('../controller/user');





router.post('/create-user', createUser);
router.post('/sign-in', userSignIn);

router.get('/', (req, res) => {
    res.json({success: true, message: 'Welcome to backend zone!'});
})

module.exports = router;