const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const Individual_Item_Sales = require('../models/individual_item_sales');

const router = express.Router();

router.use(body_parser.json());

router.get('/', (req, res, next) => {
    if(req.query != null) {
        Individual_Item_Sales.find(req.query)
        .then(sales => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json(sales);
        }, err => next(err))
        .catch(err => next(err));
    }

    Individual_Item_Sales.find()
    .then(sales => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(sales);
    }, err => next(err))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    Individual_Item_Sales.create({
        count: req.body.count,
        name: req.body.name,
        model: req.body.model,
        rate_sold: req.body.rate_sold
    })
    .then(sales => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const full_date = sales.createdAt.toString();

        const month = full_date.slice(4, 7);
        const day = full_date.slice(8, 10);
        const year = full_date.slice(11, 15);
        sales.year = year;
        sales.month = month;
        sales.day = day;

        sales.save()
        .then(sales => {
            return res.json(sales);
        }, err => next(err));
    }, err => next(err))
    .catch(err => next(err));
});

router.put('/', (req, res, next) => {
    Individual_Item_Sales.findOneAndUpdate(req.query, req.body)
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
        Individual_Item_Sales.findOneAndDelete(req.query)
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
        Individual_Item_Sales.deleteMany()
        .then(resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, err => next(err))
        .catch(err => next(err));
    }
});

module.exports = router;