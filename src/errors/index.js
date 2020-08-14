function InvalidLogin(res, next, message) {
  const error = message || new Error('Invalid login!');
  res.status(401);
  next(error);
}

function NotFound(res, next, message) {
  const error = message || new Error('Not found!');
  res.status(404);
  next(error);
}

function InvalidInput(res, next, message) {
  const error = message || new Error('Invalid input!');
  res.status(422);
  next(error);
}

function InternalServerError(res, next, message) {
  const error = message || new Error('Internal server error!');
  res.status(500);
  next(error);
}

module.exports = {
  InvalidLogin,
  NotFound,
  InvalidInput,
  InternalServerError
};