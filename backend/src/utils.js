const { customAlphabet } = require('nanoid/async');
const jwt = require('jsonwebtoken');
const { config } = require('./config');
const bcrypt = require('bcryptjs');

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  12
);

module.exports.generateId = async () => await nanoid();

module.exports.createToken = sub =>
  Promise.resolve(
    jwt.sign(
      {
        sub: sub,
        iss: config.jwt.issuer,
        aud: config.jwt.audience,
      },
      config.jwt.tokenSecret,
      {
        algorithm: 'HS256',
        expiresIn: 3600,
      }
    )
  );

module.exports.hashText = async text => {
  const salt = await bcrypt.genSalt();
  const hashedText = await bcrypt.hash(text, salt);
  return hashedText;
};

module.exports.compareHashes = async (text, hashedText) => {
  return await bcrypt.compare(text, hashedText);
};

module.exports.verifyJwt = token => {
  try {
    return jwt.verify(token, config.jwt.tokenSecret);
  } catch {
    return null;
  }
};

module.exports.toBoolean = text => text === 'true';
