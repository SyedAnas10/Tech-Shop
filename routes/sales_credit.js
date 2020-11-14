const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const Sales_Credit = require('../models/sales_credit');

const router = express.Router();

router.use(body_parser.json());

router.get('/', (req, res, next) => {
    if(req.query != null) {
        Sales_Credit.find(req.query)
        .then((sales) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json(sales);
        }, err => next(err))
        .catch(err => next(err));
    }
    
    Sales_Credit.find()
    .then((sales) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(sales);
    }, err => next(err))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    Sales_Credit.create(req.body)
    .then(sales => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        const full_date = sales.due_date.toString();

        const month = full_date.slice(4, 7);
        const day = full_date.slice(8, 10);
        const year = full_date.slice(11, 15);
        sales.year = year;
        sales.month = month;
        sales.day = day;

        sales.save()
        .then(() => {
            res.json({
                success: true,
                message: 'Updated successfully'
            });
        }, err => next(err));
    }, err => next(err))
    .catch(err => next(err));
});

router.put('/', (req, res, next) => {
    Sales_Credit.findOneAndUpdate(req.query, req.body)
    .then(sales => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(sales);
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = router;
