const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const Purchasing = require('../models/purchasing');

const router = express.Router();

router.use(body_parser.json());

router.get('/', (req, res, next) => {
    if(req.query != null) {
        Purchasing.find(req.query)
        .then(purchasing_list => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json(purchasing_list);
        }, err => next(err))
        .catch(err => next(err));
    }

    Purchasing.find()
    .then(purchasing_list => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(purchasing_list);
    }, err => next(err))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    Purchasing.create({
        item_name: req.body.item_name,
        model: req.body.model,
        count: req.body.count,
        total_cost: req.body.total_cost
    })
    .then(purchasing_list => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        
        const full_date = purchasing_list.createdAt.toString();

        const month = full_date.slice(4, 7);
        const day = full_date.slice(8, 10);
        const year = full_date.slice(11, 15);
        purchasing_list.year = year;
        purchasing_list.month = month;
        purchasing_list.day = day;

        purchasing_list.save()
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
    Purchasing.findOneAndUpdate(req.query, req.body)
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
        Purchasing.findOneAndDelete(req.query)
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
        Purchasing.deleteMany()
        .then(resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, err => next(err))
        .catch(err => next(err));
    }
});

module.exports = router;