const config = require('config');
const db = require('../_helpers/db');

module.exports = {
  create,
  remove,
  getByUser
}

async function create(params) {
  let instance = await db.mark.findOne({ where: { user_id: params.user_id, exam_id: params.exam_id } })
  if (instance) {
    Object.assign(instance, params);
    await instance.save();
  } else {
    await db.mark.create(params)
  }
}

async function getByUser(params) {
  let instance = await db.mark.findAll({ where: { user_id: params.user_id }})
  return instance
}

async function remove(params) {
  let instance = await db.mark.findOne({ where: { exam_id: params.exam_id, user_id: params.user_id } })
  if (instance) {
    db.mark.destroy({ where: { exam_id: params.exam_id, user_id: params.user_id } })
    return 'Success'
  } else {
    throw 'Mark not found'
  }
}
