const { verifyJwt } = require('../utils');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  const token = authorizationHeader && authorizationHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized: Missing bearer token',
    });
  }

  const payload = verifyJwt(token);

  if (!payload) {
    return res.status(401).json({
      status: 401,
      message:
        'Unauthorized: The provided bearer token is not valid or has been expired',
    });
  }

  req.payload = payload;
  next();
};
