const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const { config } = require('./config');
const bcrypt = require('bcryptjs');

module.exports.generateId = () => nanoid(12);

module.exports.createToken = (sub) =>
	jwt.sign(
		{
			sub: sub,
			iss: config.jwt.issuer,
			aud: config.jwt.audience,
		},
		config.jwt.tokenSecret,
		{
			algorithm: 'HS256',
			expiresIn: '15s',
		}
	);

module.exports.hashText = async (text) => {
	const salt = await bcrypt.genSalt();
	const hashedText = await bcrypt.hash(text, salt);
	return hashedText;
};