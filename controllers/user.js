const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../_middleware/validate-request')
const authorize = require('../_middleware/authorize')
const userService = require('../services/user')

// routes
router.post('/authenticate', authenticateSchema, authenticate)
router.post('/register', registerSchema, register)
router.get('/getUser/:id', getById)
router.get('/count', count)
router.post('/check', checkSchema, check)
router.get('/get/students', getAllStudents)
router.post('/remove', remove)

module.exports = router;

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => res.json(user))
    .catch(next);
}

function checkSchema(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    token: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function check(req, res, next) {
  userService.check(req.body)
    .then(response => res.json(response))
    .catch(next)
}

function registerSchema(req, res, next) {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    user_type: Joi.string().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
}

function count(req, res, next) {
  userService.count()
    .then(count => res.json(count))
    .catch(next)
}

function getAllStudents(req, res, next) {
  userService.getAllStudents()
    .then(students => res.json(students))
    .catch(next)
}

function remove(req, res, next) {
  userService.delete(req.body.id)
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(next);
}

function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

function getCurrent(req, res, next) {
  res.json(req.user);
}

function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  userService.update(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(next);
}
