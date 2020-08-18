const express = require('express');

const models = require('../db/models');
const { UnprocessableEntity, Unauthorized, InternalServerError } = require('../errors');
const { signJwtToken } = require('../helpers');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

const User = models.User;

router.post('/authenticate', async (req, res, next) => {
  const userInput = {
    username: req.body.username,
    password: req.body.password
  };

  if (!userInput.username || !userInput.password) {
    UnprocessableEntity(res, next);
  }
  else {
    try {
      const user = await User.findOne({
        where: {
          username: userInput.username
        }
      });
  
      if (!user) {
        Unauthorized(res, next);
      }
      else {
        if (await user.validPassword(userInput.password)) {
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
          Unauthorized(res, next);
        }
      }
    } catch (error) {
      Unauthorized(res, next, error);
    }
  }
});

router.post('/reauthenticate', isLoggedIn, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;