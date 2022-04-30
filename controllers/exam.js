const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const examService = require('../services/exam')

// routes
router.post('/create', createSchema, create)
router.post('/remove', removeSchema, remove)
router.get('/getmarks/:exam_id', getMarks)
router.get('/get', getExams)

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required()
  })
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  examService.create(req.body)
    .then(exam => res.json(exam))
    .catch(next)
}

function removeSchema(req, res, next) {
  const schema = Joi.object({
    exam_id: Joi.number().required()
  })
  validateRequest(req, next, schema);
}

function getMarks(req, res, next) {
  examService.getMarks(req.params)
    .then(mark => res.json(mark))
    .catch(next)
}

function remove(req, res, next) {
  examService.remove(req.body)
    .then(result => res.json(result))
    .catch(next)
}

function getExams(req, res, next) {
  examService.getExams()
    .then(exams => res.json(exams))
    .catch(next)
}
