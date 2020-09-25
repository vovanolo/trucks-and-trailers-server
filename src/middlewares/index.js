const { Unauthorized } = require('../errors');
const { verifyJwtToken } = require('../helpers');
const models = require('../db/models');

const { User } = models;

function notFound(req, res, next) {
  const error = new Error('Not found');
  res.status(404);
  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const responseMessage = {
    error: err.message,
    code: statusCode,
    stack: process.env.NODE_ENV === 'production' ? '...' : err.stack,
  };
  console.error(responseMessage);
  res.status(statusCode).json(responseMessage);
}

async function isLoggedIn(req, res, next) {
  try {
    const userToken = req.headers.authorization.split(' ')[1];

    const payload = await verifyJwtToken(userToken);

    const dbUser = await User.findOne({
      where: {
        id: payload.id,
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: payload.role,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    if (dbUser === null) {
      Unauthorized(res, next);
    } else {
      const userData = {
        accessToken: userToken,
        user: payload,
      };
      req.user = userData;
      next();
    }
  } catch (error) {
    Unauthorized(res, next);
  }
}

async function isAdmin(req, res, next) {
  if (req.user.user.role !== 'admin') {
    Unauthorized(res, next);
  } else {
    next();
  }
}

module.exports = {
  notFound,
  errorHandler,
  isLoggedIn,
  isAdmin,
};
