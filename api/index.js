const express = require('express');

const config = require('../config.js');

const bodyParser = require('body-parser');

const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/auth', auth);

app.use(errors);

app.listen(config.api.port, () => {
  console.log('api escuchando en el puerto', config.api.port)
})
