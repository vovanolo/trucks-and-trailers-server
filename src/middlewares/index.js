const { Unauthorized } = require('../errors');
const { verifyJwtToken } = require('../helpers');

function notFound(req, res, next) {
  const error = new Error('Not found');
  res.status(404);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const responseMessage = {
    error: err.message,
    code: statusCode,
    stack: err.stack
  };
  console.error(responseMessage);
  res.status(statusCode).json(responseMessage);
}

async function isLoggedIn(req, res, next) {
  try {
    const userToken = req.headers.authorization.split(' ')[1];
    const payload = await verifyJwtToken(userToken);
    const userData = {
      accessToken: userToken,
      user: payload
    };
    req.user = userData;
    next();
  } catch (error) {
    Unauthorized(res, next);
  }
}

module.exports = {
  notFound,
  errorHandler,
  isLoggedIn
};