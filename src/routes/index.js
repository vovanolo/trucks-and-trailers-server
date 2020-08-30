const express = require('express');

const authentication = require('./authentication');
const users = require('./users');
const drivers = require('./drivers');
const trailers = require('./trailers');

const router = express.Router();

router.use('/auth', authentication);
router.use('/users', users);
router.use('/drivers', drivers);
router.use('/trailers', trailers);

module.exports = router;
