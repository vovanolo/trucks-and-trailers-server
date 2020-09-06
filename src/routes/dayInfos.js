const express = require('express');
const { Op } = require('sequelize');

const models = require('../db/models');
const { NotFound, InternalServerError, Unauthorized } = require('../errors');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

const { DayInfo, Driver, Truck, Trailer, User } = models;

router.use(isLoggedIn);

router.post('/', async (req, res, next) => {
  const dates = req.body.dates;

  try {
    // const userDrivers = await User.findByPk(req.user.user.id, {
    //   include: [
    //     {
    //       model: Driver,
    //       include: [
    //         {
    //           model: Truck
    //         },
    //         {
    //           model: Trailer
    //         },
    //         {
    //           model: DayInfo,
    //           where: {
    //             date: {
    //               [Op.or]: dates
    //             }
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // });

    const drivers = await Driver.findAll({
      where: {
        userId: req.user.user.id
      },
      include: [Truck, Trailer]
    });

    const driverIds = drivers.map((driver) => driver.id);

    const dayInfos = await DayInfo.findAll({
      where: {
        [Op.and]: [
          {
            driverId: {
              [Op.or]: driverIds
            }
          },
          {
            date: {
              [Op.or]: dates
            }
          }
        ]
      }
    });

    const response = JSON.parse(JSON.stringify(drivers)).map((driver) => {
      const newDriver = driver;
      newDriver.DayInfos = [];

      JSON.parse(JSON.stringify(dayInfos)).forEach((dayInfo) => {
        if (driver.id === dayInfo.driverId) {
          newDriver.DayInfos.push(dayInfo);
        }
      });

      console.log(newDriver.DayInfos);

      return newDriver;
    });

    console.log(response);

    res.json(response);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
