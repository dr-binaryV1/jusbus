'use strict';

let Models = require('./../models');
let express = require('express');
let router = express.Router();

let Grocery = Models.Grocery;

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

router.get('/grocery', (req, res, next) => {
    Grocery.find({}, null, (error, grocery) => {
        if(error) return next(error);
        res.json(grocery);
    });
});

/***
 *
 * ALL POST REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

router.post('/grocery', (req, res, next) => {
    let grocery = new Grocery(req.body);
    grocery.save((error, results) => {
        if(error) return next(error);
        res.status(201);
        res.json(results);
    })
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