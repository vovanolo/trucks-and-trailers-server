const express = require('express');

const models = require('../db/models');
const { NotFound, InternalServerError, Unauthorized } = require('../errors');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

const { User } = models;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password']
      }
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
        exclude: ['password']
      }
    });

    if (!user) {
      NotFound(res, next);
    }
    else {
      res.json(user);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create({
      ...req.body
    }, {
      fields: ['username', 'password', 'firstName', 'lastName']
    });

    const userResponse = JSON.parse(JSON.stringify(newUser));
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.patch('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const isOwner = req.user.user.id == req.params.id;
    const isAdmin = req.user.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      Unauthorized(res, next);
    }
    else {
      const userInput = req.body;

      const userAllowedFields = ['firstName', 'lastName', 'username', 'password'];
      const adminAllowedFields = [...userAllowedFields, 'role'];
      
      const updatedUser = await User.update({ ...userInput }, {
        returning: true,
        where: {
          id: req.params.id
        },
        fields: req.user.user.role === 'admin' ? adminAllowedFields : userAllowedFields
      });

      const userResponse = JSON.parse(JSON.stringify(updatedUser[1]));
      userResponse.forEach((userData) => delete userData.password);

      res.json(userResponse);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      NotFound(res, next);
    }
    else {
      await user.destroy();
      res.json(`User ${req.params.id} deleted successfully`);
    }
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;
