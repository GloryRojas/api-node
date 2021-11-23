const express = require('express');

const response =  require('../../../network/response');

const Controller = require('./index');
const errors = require("../../../network/errors");

const router = express.Router();

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)

async function list (req, res, next) {
  try {
    const data = await Controller.list();
    response.success(req, res, data, 200)
  } catch (e) {
    next()
  }
}

async function get (req, res, next) {
  try {
    const user = await Controller.get(req.params.id);
    response.success(req, res, user, 200)
  } catch (e) {
    errors(e, req, res, next)
  }
}

async function upsert (req, res, next) {
  try {
    console.log(req.body)
    const data = await Controller.upsert(req.body);
    response.success(req, res, data, 200)
  } catch (e) {
    console.log(e);
    next()
    //errors(e, req, res, next)
  }
}

module.exports = router;
