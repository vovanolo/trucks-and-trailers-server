const express = require('express');

const models = require('../db/models');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();
const { Company, Driver, Truck, Trailer } = models;

module.exports = router;
