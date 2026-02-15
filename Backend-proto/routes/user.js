const express = require('express');
const router = express.Router();


const Users = require('../models/Users');

const userCtrl = require('../controller/user');


router.post('/login', userCtrl.login);

module.exports = router;