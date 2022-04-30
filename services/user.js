const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const redis = require('../_helpers/redis')

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  count,
  check,
  getAllStudents
};

async function authenticate({ username, password }) {
  const user = await db.user.scope('withHash').findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw 'Email or password is incorrect';

  // authentication successful
  const token = jwt.sign({ sub: user.id }, config.get('privateToken'), { expiresIn: '7d' });

  await redis.client.set('token:' + user.id, token)

  return { ...omitHash(user.get()), token };
}

async function check({ user_id, token }) {
  const userToken = await redis.client.get('token:' + user_id)
  if (userToken !== token)
    throw 'Invalid token'
  return 'Success'
}

async function getAllStudents() {
  return await db.user.findAll({ where: { user_type: 'student' } })
}

async function getAll() {
  return await db.user.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (await db.user.findOne({ where: { username: params.username } })) {
    throw 'Email "' + params.username + '" is already taken';
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // save user
  await db.user.create(params);
}

async function update(id, params) {
  const user = await getUser(id);

  // validate
  const usernameChanged = params.username && user.username !== params.username;
  if (usernameChanged && await db.user.findOne({ where: { email: params.username } })) {
    throw 'Username "' + params.username + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.user.findByPk(id);
  if (!user) throw 'User not found';
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}

async function count() {
  const users = await db.user.findAll();
  return users.length
}
