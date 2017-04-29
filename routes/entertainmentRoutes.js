'use strict';

let Models = require('./../models');
let mid = require('./../middleware/app');
let express = require('express');
let router = express.Router();

let Entertainment = Models.Entertainment;

/***
 *
 * BELOW ARE METHODS TO RETRIEVE PARAMETERS FROM THE URL
 *
 */

/***
 *
 * ALL GET REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

router.get('/entertainment', (req, res) => {
    Entertainment.find({}, null, (error, ent) => {
        if(error) return next(error);
        res.json(ent);
    })
});

/***
 *
 * ALL POST REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

router.post('/entertainment', (req, res, next) => {
       let entertainment = new Entertainment(req.body);
       console.log(req.data);
       entertainment.save((error, results) => {
           if(error) return next(error);
           res.status(201);
           res.json(results);
       })
});

router.post('/entertainment/upload', (req, res, next) => {
    res.status(201);
    res.json(req.body);
});

/***
 *
 * ALL PUT REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

/***
 *
 * ALL DELETE REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

module.exports = router;
