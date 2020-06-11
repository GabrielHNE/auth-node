const express = require('express');
const UserController = require('./UserController');

const router = express.Router();

router.post('/register', UserController.create);

module.exports = router;