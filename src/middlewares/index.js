const { Unauthorized } = require('../errors');
const { verifyJwtToken } = require('../helpers');

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

async function isAdmin(req, res, next) {
  if (req.user.user.role !== 'admin') {
    Unauthorized(res, next);
  }
  else {
    next();
  }
}

async function isOwnerOrAdmin(req, res, next) {
  const isOwner = req.user.user.id == req.params.id;
  const isAdmin = req.user.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    Unauthorized(res, next);
  }
  else {
    next();
  }
}

module.exports = {
  notFound,
  errorHandler,
  isLoggedIn,
  isAdmin,
  isOwnerOrAdmin
};
