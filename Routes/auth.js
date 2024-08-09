const express = require('express');
const router = express.Router();
const {register,login,userHandler} = require('../controller/Authcon');
const Authware = require('../middleware/Authmiddleware');

router.post('/register',register);
router.post('/login',login);
router.get('/user',(Authware,userHandler));




module.exports = router;