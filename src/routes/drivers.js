const express = require('express');

const models = require('../db/models');
const { NotFound, InternalServerError, Unauthorized } = require('../errors');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

const { Driver, Trailer, Truck, Company, User } = models;

router.use(isLoggedIn);

router.get('/', async (req, res, next) => {
  try {
    const drivers = await User.findByPk(req.user.user.id, {
      include: {
        model: Driver,
        attributes: {
          exclude: ['userId'],
        },
        include: [Truck, Trailer, Company],
      },
      attributes: {
        exclude: ['password'],
      },
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
    } else {
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
      userId: req.user.user.id,
    };

    const newDriver = await Driver.create(driverData, {
      fields: ['firstName', 'lastName', 'comment', 'rate', 'userId'],
    });

    if (driverData.trailerId) {
      await Trailer.update(
        { driverId: newDriver.id },
        {
          where: {
            id: driverData.trailerId,
          },
        }
      );
    }

    if (driverData.truckId) {
      await Truck.update(
        { driverId: newDriver.id },
        {
          where: {
            id: driverData.truckId,
          },
        }
      );
    }

    if (driverData.companyId) {
      await Company.update(
        { driverId: newDriver.id },
        {
          where: {
            id: driverData.companyId,
          },
        }
      );
    }

    const driverResponse = JSON.parse(JSON.stringify(newDriver));

    res.json(driverResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    await Driver.update(req.body, {
      where: {
        id: req.params.id,
      },
      fields: ['firstName', 'lastName', 'comment', 'rate'],
    });

    const editedDriver = await Driver.findByPk(req.params.id);

    const newTruck = req.body.truckId
      ? await Truck.findByPk(req.body.truckId)
      : null;

    const newTrailer = req.body.trailerId
      ? await Trailer.findByPk(req.body.trailerId)
      : null;

    const newCompany = req.body.companyId
      ? await Company.findByPk(req.body.companyId)
      : null;

    await editedDriver.setTruck(newTruck ? newTruck.id : null);
    await editedDriver.setTrailer(newTrailer ? newTrailer.id : null);
    await editedDriver.setCompany(newCompany ? newCompany.id : null);

    editedDriver.save();

    const driverResponse = await Driver.findByPk(req.params.id, {
      include: [Trailer, Truck, Company],
    });

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
      return;
    } else {
      await driver.setCompany(null);
      await driver.destroy();
      res.json(`Driver ${req.params.id} removed successfully`);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
