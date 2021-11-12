const { nanoid } = require('nanoid');
const auth = require('../auth');
const TABLA = 'user';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if(!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLA)
  }
  function get(ID) {
    return store.get(TABLA, ID)
  }
  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
      id: body.id || nanoid()
    }
    if(body.password || body.username){
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      })
    }
    return store.upsert(TABLA, user);
  }

  return {
    list,
    get,
    upsert,
  }
}
