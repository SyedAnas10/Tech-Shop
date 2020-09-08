const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const Items = require('../models/items');

const router = express.Router();

router.use(body_parser.json());

router.get('/', (req, res, next) => {
    if(req.query) {
        Items.find(req.query)
        .then(items => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json(items);
        }, err => next(err))
        .catch(err => next(err));
    }

    Items.find()
    .then(items => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(items);
    }, err => next(err))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    Items.create({
        name: req.body.name,
        cost_price: req.body.cost_price,
        retail_price: req.body.retail_price,
        model: req.body.model,
        count: req.body.count
    })
    .then(item => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(item);
    }, err => next(err))
    .catch(err => next(err));
});

router.put('/', (req, res, next) => {
    Items.findOneAndUpdate(req.query, req.body)
    .then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            success: true,
            message: 'Updated successfully'
        });
    }, err => next(err))
    .catch(err => next(err));
});

router.delete('/', (req, res, next) => {
    if(req.query != null) {
        Items.findOneAndDelete(req.query)
        .then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({
                success: true,
                message: 'Deleted successfully'
            });
        }, err => next(err))
        .catch(err => next(err));
    }  
    else {
        Items.deleteMany()
        .then(resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, err => next(err))
        .catch(err => next(err));
    }
});

module.exports = router;