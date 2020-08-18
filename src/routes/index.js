const express = require('express');

const authentication = require('./authentication');
const users = require('./users');

const router = express.Router();

router.use('/auth', authentication);
router.use('/users', users);

module.exports = router;
