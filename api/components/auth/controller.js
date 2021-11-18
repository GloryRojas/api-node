const bcrypt = require('bcrypt');
const auth = require('../../../auth/index');
const TABLA = 'auth';
const error = require('../../../utils/error');

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  async function upsert (data) {
    console.log({data})
    const authData = {
      id: data.id,
    }
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }
    return store.upsert(TABLA, authData);
  }

  async function login (username, password) {
    const data = await store.query(TABLA, { username: username });
    console.log(data.password, password, 'data')
    const areEquals = await bcrypt.compare(password, data.password);
    if(areEquals) {
      console.log('entro')
      return auth.sign({...data});
    } else {
      console.log('murio')
      throw new Error('Informacion invalida');
    }
  }

  return {
    upsert,
    login
  }
}
