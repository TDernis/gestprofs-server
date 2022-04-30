const config = require('config');
const db = require('../_helpers/db');

module.exports = {
  create,
  remove,
  getMarks,
  getExams
}

async function create(params) {
  await db.exam.create(params);
}

async function remove(params) {
  let instance = await db.exam.findByPk(params.exam_id)
  if (instance) {
    await instance.destroy()
    return 'Success'
  } else {
    throw 'Exam not found'
  }
}

async function getMarks(params) {
  let instance = await db.mark.findAll({ where: { exam_id: params.exam_id } })
  return instance
}

async function getExams() {
  let instance = await db.exam.findAll()
  return instance
}
