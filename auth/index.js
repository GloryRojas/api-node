const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require("../utils/error");

const secret = config.jwt.secret;

function sign (data) {
  console.log(data, 'jwt')
  return jwt.sign(data, secret);
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    if(decoded.id !== owner) {
      throw error('No puedes hacer esto', 401);
    }
  },
  logged: (req) => {
    const decoded = decodeHeader(req);
    if(!decoded) {
      throw error('No puedes hacer esto', 401);
    }
  }
}

function getToken (auth) {
  // Bearer token
  if(!auth) throw new Error('No viene token');

  if (auth.indexOf('Bearer ') === -1) throw new Error('Formato inválido');

  return auth.replace('Bearer ', '');
}

function verify (token) {
  return jwt.verify(token, secret)
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check
}
