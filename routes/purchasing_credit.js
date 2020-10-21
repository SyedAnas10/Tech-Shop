const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const Purchasing_Credit = require('../models/purchasing_credit');

const router = express.Router();

router.use(body_parser.json());

router.get('/', (req, res, next) => {
    if(req.query != null) {
        Purchasing_Credit.find(req.query)
        .then((purchasing) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json(purchasing);
        }, err => next(err))
        .catch(err => next(err));
    }
    
    Purchasing_Credit.find()
    .then((purchasing) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(purchasing);
    }, err => next(err))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    console.log(JSON.stringify(req.body));
    Purchasing_Credit.create(req.body)
    .then(purchasing => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        const full_date = purchasing.createdAt.toString();

        const month = full_date.slice(4, 7);
        const day = full_date.slice(8, 10);
        const year = full_date.slice(11, 15);
        purchasing.year = year;
        purchasing.month = month;
        purchasing.day = day;

        purchasing.save()
        .then(() => {
            res.json({
                success: true,
                message: 'Updated successfully'
            });
        }, err => next(err));
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = router;