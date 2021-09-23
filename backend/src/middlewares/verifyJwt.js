const { verifyJwt } = require('../utils');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  const token = authorizationHeader && authorizationHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({
      status: 401,
      message:
        'You must provide a bearer token to access to the requested resource',
    });

  const payload = verifyJwt(token);

  if (!payload)
    return res.status(401).json({
      status: 401,
      message: 'The provided bearer token is not valid',
    });

  req.payload = payload;
  next();
};
