const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const User = require('../models/user');

const router = express.Router();

router.use(body_parser.json());

router.get('/', (req, res, next) => {
  User.find()
  .then(users => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.json(users);
  }, err => next(err))
  .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.json(user);
  }, err => next(err))
  .catch(err => next(err));
});

router.put('/', (req, res, next) => {
  User.findOneAndUpdate(req.query, req.body)
  .then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.json(user);
  }, err => next(err))
  .catch(err => next(err));
})

module.exports = router;
