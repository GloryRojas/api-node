const mysql = require('mysql');

const config = require('../config');

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);
  connection.connect((err) => {
    if(!err) return;
    setTimeout(handleCon, 2000);
  })

  connection.on('err', err => {
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  })
}

handleCon();

function list (table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if(err) return reject();
      resolve(data)
    })
  })
}

async function get (table, id) {
  console.log({table, id})
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if(err) return reject();
      resolve(data)
    })
  })
}

async function update (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id] , (err, result) => {
      if(err) return reject();
      resolve(result)
    })
  })
}

async function insert (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data , (err, result) => {
      if(err) return reject();
      resolve(result)
    })
  })
}

async function upsert (table, data) {
  const { id } = data;
  const userExist = await get('user', id);
  if(userExist.length) {
    return update(table, data)
  } else {
    return insert(table, data)
  }
}

async function query (table, query, join) {
  let joinQuery = '';
  if(join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query , (err, result) => {
      if(err) return reject(err);
      resolve(result[0] || null)
    })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query,
  insert
}
