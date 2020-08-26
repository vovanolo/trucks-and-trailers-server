const express = require('express');

const models = require('../db/models');
const { NotFound, InternalServerError, Unauthorized } = require('../errors');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

const { Driver, User } = models;

router.use(isLoggedIn);

router.get('/', async (req, res, next) => {
  try {
    // const drivers = await Driver.findAll({
    //   include: {
    //     model: models.User,
    //     attributes: {
    //       exclude: ['password']
    //     }
    //   },
    //   attributes: {
    //     exclude: ['userId']
    //   }
    // });

    const drivers = await User.findByPk(req.user.user.id, {
      include: {
        model: Driver,
        attributes: {
          exclude: ['userId']
        }
      },
      attributes: {
        exclude: ['password']
      }
    });

    res.json(drivers.Drivers);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const driver = await Driver.findByPk(req.params.id);

    if (!driver) {
      NotFound(res, next);
    }
    else {
      res.json(driver);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const driverData = {
      ...req.body,
      userId: req.user.user.id
    };

    const newDriver = await Driver.create(driverData, {
      fields: ['firstName', 'lastName', 'comment', 'rate', 'userId']
    });

    const driverResponse = JSON.parse(JSON.stringify(newDriver));

    res.json(driverResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const driverInput = req.body;
    
    const updatedDriver = await Driver.update({ ...driverInput }, {
      returning: true,
      where: {
        id: req.params.id
      },
      fields: ['firstName', 'lastName', 'comment', 'rate']
    });

    const driverResponse = JSON.parse(JSON.stringify(updatedDriver[1]));

    res.json(driverResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const driver = await Driver.findByPk(req.params.id);

    if (!driver) {
      NotFound(res, next);
    }
    else {
      await driver.destroy();
      res.json(`Driver ${req.params.id} removed successfully`);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
