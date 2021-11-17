const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();
const error = require('../../../utils/error');

router.post('/login', login)

async function login (req, res) {
  try {
    const { username, password } = req.body;
    const token = await Controller.login(username, password);
    response.success(req, res, token, 200);
  } catch (e) {
    throw error('Informacion invalida', 400)
  }
}

module.exports = router;
