const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const Repairing = require('../models/repairing');

const router = express.Router();

router.use(body_parser.json());

router.get('/', (req, res, next) => {
    if(req.query != null) {
        Repairing.find(req.query)
        .then(repair_details => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json(repair_details);
        }, err => next(err))
        .catch(err => next(err));
    }

    Repairing.find()
    .then(repair_details => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(repair_details);
    }, err => next(err))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    Repairing.create({
        item: req.body.item,
        serial_no: req.body.serial_no,
        customer_name: req.body.customer_name,
        contact_no: req.body.contact_no,
        repair_cost: req.body.repair_cost,
        retail_cost: req.body.retail_cost,
        profit: req.body.profit,
        details: req.body.details
    })
    .then(repair_details => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(repair_details);
    }, err => next(err))
    .catch(err => next(err));
});

router.put('/', (req, res, next) => {
    Repairing.findOneAndUpdate(req.query, req.body)
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
        Repairing.findOneAndDelete(req.query)
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
        Repairing.deleteMany()
        .then(resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, err => next(err))
        .catch(err => next(err));
    }
});

module.exports = router;