const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { InvalidInput, InvalidLogin } = require('../errors');
const models = require('../db/models');

const router = express.Router();

const User = models.User;

function signJwtToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_KEY, (error, token) => {
      if (error) reject(error);
      else {
        resolve(token);
      }
    })
  });
}

router.post('/', async (req, res, next) => {
  const userInput = {
    username: req.body.username,
    password: req.body.password
  };

  if (!userInput.username || !userInput.password) {
    InvalidInput(res, next);
  }

  try {
    const user = await User.findOne({ username: userInput.username });

    if (!user) {
      InvalidLogin(res, next);
    }
    else {
      const passMatch = await bcrypt.compare(userInput.password, user.password);

      if (passMatch) {
        // generate JWT token and send it back
        const payload = JSON.parse(JSON.stringify(user));
        delete payload.password;

        const token = await signJwtToken(payload);

        const responseMessage = {
          accessToken: token,
          user: payload
        };
        res.json(responseMessage);
      }
      else {
        InvalidLogin(res, next);
      }
    }
  } catch (error) {
    InvalidLogin(res, next, error);
  }
});

module.exports = router;