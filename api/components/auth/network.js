const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();
const errors = require('../../../network/errors');

router.post('/login', login)

async function login (req, res, next) {
  try {
    const { username, password } = req.body;
    const token = await Controller.login(username, password);
    response.success(req, res, token, 200);
  } catch (e) {
    errors(e, req, res, next)
  }
}

module.exports = router;
