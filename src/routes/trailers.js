const express = require('express');

const models = require('../db/models');
const { NotFound, InternalServerError, Unauthorized } = require('../errors');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

const { Trailer, User } = models;

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

    const trailers = await User.findByPk(req.user.user.id, {
      include: {
        model: Trailer,
        attributes: {
          exclude: ['userId']
        }
      },
      attributes: {
        exclude: ['password']
      }
    });

    res.json(trailers.Trailers);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const trailer = await Trailer.findByPk(req.params.id);

    if (!trailer) {
      NotFound(res, next);
    }
    else {
      res.json(trailer);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const trailerData = {
      ...req.body,
      userId: req.user.user.id
    };

    const newTrailer = await Trailer.create(trailerData, {
      fields: ['name', 'comment', 'location', 'userId']
    });

    const trailerResponse = JSON.parse(JSON.stringify(newTrailer));

    res.json(trailerResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const trailerInput = req.body;
    
    const updatedTrailer = await Driver.update({ ...trailerInput }, {
      returning: true,
      where: {
        id: req.params.id
      },
      fields: ['name', 'comment', 'location', 'driverId']
    });

    const trailerResponse = JSON.parse(JSON.stringify(updatedTrailer[1]));

    res.json(trailerResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const trailer = await Trailer.findByPk(req.params.id);

    if (!trailer) {
      NotFound(res, next);
    }
    else {
      await trailer.destroy();
      res.json(`Trailer ${req.params.id} removed successfully`);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
