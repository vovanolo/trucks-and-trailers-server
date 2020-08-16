const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { InvalidInput, InvalidLogin, InternalServerError } = require('../errors');
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

function verifyJwtToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
      if (error) reject(error);
      else {
        resolve(payload);
      }
    });
  })
}

router.post('/', async (req, res, next) => {
  switch (req.body.strategy) {
    case 'local':
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
      break;

    case 'JWT':
      try {
        const userToken = req.headers.authorization.split(' ')[1];
        const payload = await verifyJwtToken(userToken);
        const responseMessage = {
          accessToken: userToken,
          user: payload
        };
        res.json(responseMessage);
      } catch (error) {
        InternalServerError(res, next, error);
      }
      break;
  
    default:
      InvalidInput(res, next);
      break;
  }
});

module.exports = router;