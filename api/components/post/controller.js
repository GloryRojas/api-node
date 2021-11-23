const { nanoid } = require('nanoid');
const TABLA = 'post';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  function list () {
    return store.list(TABLA);
  }

  function get(ID) {
    return store.get(TABLA, ID)
  }

  function upsert(data) {
    console.log(data)
    return store.insert(TABLA, {
     ...data
    });
  }

  return {
    list,
    get,
    upsert
  }
};
