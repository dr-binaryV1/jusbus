'use strict';

let Models = require('./../models');
let express = require('express');
let router = express.Router();

let Building = Models.Building;

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

router.get('/building', (req, res, next) => {
    Building.find({}, null, (error, building) => {
        if(error) return next(error);
        res.json(building);
    });
});

/***
 *
 * ALL POST REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

router.post('/building', (req, res, next) => {
    let building = new Building(req.body);
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
