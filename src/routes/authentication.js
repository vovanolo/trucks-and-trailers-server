const express = require('express');

const models = require('../db/models');
const { UnprocessableEntity, Unauthorized, InternalServerError } = require('../errors');
const { signJwtToken, verifyJwtToken } = require('../helpers');

const router = express.Router();

const User = models.User;

router.post('/', async (req, res, next) => {
  switch (req.body.strategy) {
    case 'local':
      const userInput = {
        username: req.body.username,
        password: req.body.password
      };
    
      if (!userInput.username || !userInput.password) {
        UnprocessableEntity(res, next);
      }
    
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
      UnprocessableEntity(res, next);
      break;
  }
});

module.exports = router;