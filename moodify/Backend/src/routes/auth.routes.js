const express = require('express');
const router = express.Router();

const authContoller = require('../controllers/auth.controller')

router.post('/register' ,authContoller.registerUser )
router.post('/login' ,authContoller.loginUser )


module.exports = router;



