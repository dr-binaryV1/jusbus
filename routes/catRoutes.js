'use strict';

let Models = require('./../models');
let express = require('express');
let router = express.Router();

let Category = Models.Category;

router.post('/categories', (req, res, next) => {
    let category = new Category(req.body);
    category.save((error, results) => {
        if (error) return next(error);
        res.status(201);
        res.json(results);
    })
});

router.get('/categories', (req, res) => {
   Category.find({}, null, (error, results) => {
       if(error) return next(error);
       res.json(results);
   })
});

module.exports = router;
