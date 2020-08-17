const express = require('express');
const bcrypt = require('bcrypt');

const models = require('../db/models');
const { NotFound, InternalServerError } = require('../errors');

const router = express.Router();

const User = models.User;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    
    res.json(users);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

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

    res.json(newUser);
  } catch (error) {
    InternalServerError(res, next, error);
  }
});

module.exports = router;