const express = require('express');

const UserController = require('./UserController');

const router = express.Router();

router.post('/register', UserController.create);

router.post('/authentication', UserController.index);

module.exports = router;