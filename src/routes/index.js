const express = require('express');

const authentication = require('./authentication');

const router = express.Router();

router.use('/authentication', authentication);

module.exports = router;