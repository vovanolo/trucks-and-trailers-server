const express = require('express');
const { Op } = require('sequelize');

const models = require('../db/models');
const { NotFound, InternalServerError, Unauthorized } = require('../errors');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

const { DayInfo, Driver, Truck, Trailer, User } = models;

router.use(isLoggedIn);

router.post('/all', async (req, res, next) => {
  const dates = req.body.dates;

  try {
    const drivers = await Driver.findAll({
      where: {
        userId: req.user.user.id,
      },
      include: [Truck, Trailer],
    });

    const driverIds = drivers.map((driver) => driver.id);

    const dayInfos = await DayInfo.findAll({
      where: {
        [Op.and]: [
          {
            driverId: {
              [Op.or]: driverIds,
            },
          },
          {
            date: {
              [Op.or]: dates,
            },
          },
        ],
      },
    });

    const response = JSON.parse(JSON.stringify(drivers)).map((driver) => {
      const newDriver = driver;
      newDriver.DayInfos = [];

      JSON.parse(JSON.stringify(dayInfos)).forEach((dayInfo) => {
        if (driver.id === dayInfo.driverId) {
          newDriver.DayInfos.push(dayInfo);
        }
      });

      return newDriver;
    });

    res.json(response);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const dayInfo = await DayInfo.findByPk(req.params.id);
    res.json(dayInfo);
  } catch (error) {
    InternalServerError(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const dayInfoData = {
      ...req.body,
      userId: req.user.user.id,
    };

    const newDayInfo = await DayInfo.create(dayInfoData, {
      fields: [
        'date',
        'time',
        'location',
        'value',
        'status',
        'driverId',
        'userId',
      ],
    });

    const response = JSON.parse(JSON.stringify(newDayInfo));

    res.json(response);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
