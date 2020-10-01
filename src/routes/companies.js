const express = require('express');

const models = require('../db/models');
const { isLoggedIn, isAdmin } = require('../middlewares');
const { InternalServerError } = require('../errors');

const router = express.Router();
const { Company, Driver, Truck, Trailer } = models;

router.get('/', async (req, res, next) => {
  try {
    const companies = await Company.findAll();

    res.json(companies);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
