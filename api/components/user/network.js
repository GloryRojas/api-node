const express = require('express');

const response =  require('../../../network/response');

const Controller = require('./index');

const router = express.Router();

router.get('/', list)
router.get('/:id', get )
router.post('/', upsert )

async function list (req, res) {
  try {
    const list = await Controller.list();
    response.success(req, res, list, 200)
  } catch (e) {
    response.error(req, res, e.message, 500)
  }
}

async function get (req, res) {
  try {
    const user = await Controller.get(req.params.id);
    response.success(req, res, user, 200)
  } catch (e) {
    response.error(req, res, e.message, 500)
  }
}

async function upsert (req, res) {
  try {
    const data = await Controller.upsert(req.body);
    response.success(req, res, data, 200)
  } catch (e) {
    response.error(req, res, e.message, 500)
  }
}

module.exports = router;