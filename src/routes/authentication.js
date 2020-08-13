const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { InvalidInput, InvalidLogin } = require('../errors');

const router = express.Router();

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

router.get('/', async (req, res, next) => {
  const userInput = {
    username: req.body.username,
    password: req.body.password
  };

  if (!userInput.username || !userInput.password) {
    InvalidInput(res, next);
  }

  try {
    const user = await User.findOne({ username: userInput.username });

    const passMatch = await bcrypt.compare(userInput.password, user.password);

    if (passMatch) {
      // generate JWT token and send it back
      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
      const token = await signJwtToken(payload);

      const responseMessage = {
        accessToken: token,
        user: {
          ...payload
        }
      };
      res.json(responseMessage);
    }
    else {
      InvalidLogin(res, next);
    }
  } catch (error) {
    InvalidLogin(res, next, error);
  }
});

module.exports = router;