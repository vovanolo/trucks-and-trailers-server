const express = require('express');

const authentication = require('./authentication');
const users = require('./users');

const router = express.Router();

router.use('/authenticate', authentication);
router.use('/users', users);

module.exports = router;