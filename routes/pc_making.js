const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const PC_Making = require('../models/pc_making');

const router = express.Router();

router.use(body_parser.json());

router.get('/', (req, res, next) => {
    if(req.body != null) {
        PC_Making.find(req.query)
        .then(pc_in_making => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json(pc_in_making);
        }, err => next(err))
        .catch(err => next(err));
    }

    PC_Making.find()
    .then(pc_in_making => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(pc_in_making);
    }, err => next(err))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    PC_Making.create({
        customer_name: req.body.customer_name,
        specs_list: req.body.specs_list,
        specs_cost: req.body.specs_cost,
        specs_retail: req.body.specs_retail,
        profit: req.body.profit,
        advance_payment: req.body.advance_payment
    })
    .then(pc_in_making => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(pc_in_making);
    }, err => next(err))
    .catch(err => next(err));
});

router.put('/', (req, res, next) => {
    PC_Making.findOneAndUpdate(req.query, req.body)
    .then((pc_in_making) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const full_date = pc_in_making.updatedAt.toString();

        const month = full_date.slice(4, 7);
        const day = full_date.slice(8, 10);
        const year = full_date.slice(11, 15);
        pc_in_making.year = year;
        pc_in_making.month = month;
        pc_in_making.day = day;

        pc_in_making.save()
        .then(() => {
            res.json({
                success: true,
                message: 'Updated successfully'
            });
        }, err => next(err));
    }, err => next(err))
    .catch(err => next(err));
});

router.delete('/', (req, res, next) => {
    if(req.query != null) {
        PC_Making.findOneAndDelete(req.query)
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
        PC_Making.deleteMany()
        .then(resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, err => next(err))
        .catch(err => next(err));
    }
});

module.exports = router;