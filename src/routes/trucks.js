const express = require('express');

const models = require('../db/models');
const { NotFound, InternalServerError, Unauthorized } = require('../errors');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

const { Truck, Company } = models;

router.use(isLoggedIn);

router.get('/', async (req, res, next) => {
  try {
    const trucks = await Truck.findAll({
      where: {
        userId: req.user.user.id,
      },
      include: {
        model: Company,
      },
    });

    res.json(trucks);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const truck = await Truck.findByPk(req.params.id);

    if (!truck) {
      NotFound(res, next);
    } else {
      res.json(truck);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const truckData = {
      ...req.body,
      userId: req.user.user.id,
    };

    const newTruck = await Truck.create(truckData, {
      fields: ['name', 'comment', 'rate', 'ownedByCompany', 'userId'],
    });

    if (truckData.companyId) {
      await Company.update(
        { truckId: newTruck.id },
        {
          where: {
            id: truckData.companyId,
          },
        }
      );
    }

    const truckResponse = JSON.parse(JSON.stringify(newTruck));

    res.json(truckResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const truckInput = req.body;

    const updatedTruck = await Truck.update(
      { ...truckInput },
      {
        returning: true,
        where: {
          id: req.params.id,
        },
        fields: ['name', 'comment', 'rate', 'ownedByCompany', 'driverId'],
      }
    );

    const truckResponse = JSON.parse(JSON.stringify(updatedTruck[1]));

    res.json(truckResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const truck = await Truck.findByPk(req.params.id);

    if (!truck) {
      NotFound(res, next);
    } else {
      await truck.destroy();
      res.json(`Truck ${req.params.id} removed successfully`);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
