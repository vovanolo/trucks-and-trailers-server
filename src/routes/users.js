const express = require('express');

const models = require('../db/models');
const { NotFound, InternalServerError, Unauthorized } = require('../errors');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

const { User } = models;

router.use(isLoggedIn);
router.use(isAdmin);

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });

    res.json(users);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      NotFound(res, next);
    } else {
      res.json(user);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(
      {
        ...req.body,
      },
      {
        fields: ['username', 'password', 'firstName', 'lastName', 'role'],
      }
    );

    const userResponse = JSON.parse(JSON.stringify(newUser));
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const userInput = { ...req.body };
    let updatedUser = null;

    console.log(userInput.password);

    if (!userInput.password || userInput.password.length <= 0) {
      updatedUser = await User.update(
        { ...userInput },
        {
          returning: true,
          where: {
            id: req.params.id,
          },
          fields: ['firstName', 'lastName', 'username', 'role'],
        }
      );
    } else {
      updatedUser = await User.update(
        { ...userInput },
        {
          returning: true,
          where: {
            id: req.params.id,
          },
          fields: ['firstName', 'lastName', 'username', 'password', 'role'],
        }
      );
    }

    const userResponse = JSON.parse(JSON.stringify(updatedUser[1]));
    userResponse.forEach((userData) => delete userData.password);

    res.json(userResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      NotFound(res, next);
    } else {
      await user.destroy();
      res.json(`User ${req.params.id} deleted successfully`);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
