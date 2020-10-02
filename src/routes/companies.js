const express = require('express');
const { Op } = require('sequelize');

const models = require('../db/models');
const { isLoggedIn, isAdmin } = require('../middlewares');
const {
  InternalServerError,
  NotFound,
  UnprocessableEntity,
} = require('../errors');

const router = express.Router();
const { Company, Driver, Truck, Trailer, User } = models;

router.use(isLoggedIn);

router.get('/', async (req, res, next) => {
  try {
    const companies = await Company.findAll({
      where: {
        userId: req.user.user.id,
      },
    });

    res.json(companies);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const company = await Company.findAll({
      where: {
        userId: req.user.user.id,
        id: req.params.id,
      },
    });

    if (!company || company.length <= 0) {
      NotFound(res, next);
      return;
    }

    res.json(company);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      UnprocessableEntity(res, next);
      return;
    }

    const newCompany = await Company.create(
      {
        ...data,
        userId: req.user.user.id,
      },
      {
        fields: ['name', 'driverId', 'truckId', 'trailerId', 'userId'],
      }
    );

    res.json(newCompany);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      UnprocessableEntity(res, next);
      return;
    }

    const newCompany = await Company.update(data, {
      where: {
        id: req.params.id,
      },
      fields: ['name', 'driverId', 'truckId', 'trailerId'],
      returning: true,
    });

    res.json(JSON.parse(JSON.stringify(newCompany[1][0])));
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      UnprocessableEntity(res, next);
      return;
    }
    const company = await Company.findByPk(req.params.id);

    if (!company) {
      NotFound(res, next);
      return;
    } else {
      await company.destroy();
      res.json(`Company ${req.params.id} removed successfully`);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
