function Unauthorized(res, next, message) {
  const error = message || new Error('Unauthorized!');
  res.status(401);
  next(error);
}

function NotFound(res, next, message) {
  const error = message || new Error('Not found!');
  res.status(404);
  next(error);
}

function UnprocessableEntity(res, next, message) {
  const error = message || new Error('Unprocessable Entity!');
  res.status(422);
  next(error);
}

function InternalServerError(res, next, message) {
  const error = message || new Error('Internal server error!');
  res.status(500);
  next(error);
}

module.exports = {
  Unauthorized,
  NotFound,
  UnprocessableEntity,
  InternalServerError
};