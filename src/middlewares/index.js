const jwt = require('jsonwebtoken');

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

function isLoggedIn(req, res, next) {

}

module.exports = {
  notFound,
  errorHandler
};