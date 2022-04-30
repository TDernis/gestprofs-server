const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../_middleware/validate-request')
const markService = require('../services/mark');

// routes
router.post('/create', createSchema, create)
router.post('/remove', removeSchema, remove)
router.get('/get/:user_id', get)

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    exam_id: Joi.number().required(),
    user_id: Joi.number().required(),
    mark: Joi.string().required()
  })
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  markService.create(req.body)
    .then(mark => res.json(mark))
    .catch(next);
}

function removeSchema(req, res, next) {
  const schema = Joi.object({
    exam_id: Joi.number().required(),
    user_id: Joi.number().required()
  })
  validateRequest(req, next, schema);
}

function remove(req, res, next) {
  markService.remove(req.body)
    .then(mark => res.json(mark))
    .catch(next)
}

function get(req, res, next) {
  markService.getByUser(req.params)
    .then(marks => res.json(marks))
    .catch(next)
}
