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

module.exports = {
  signJwtToken,
  verifyJwtToken
};