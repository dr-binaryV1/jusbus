'use strict';

let Models = require('./../models');
let mid = require('./../middleware/app');
let express = require('express');
let router = express.Router();

let Rental = Models.Rental;

/***
 *
 * BELOW ARE METHODS TO RETRIEVE PARAMETERS FROM THE URL
 *
 */

router.param("rID", (req, res, next, id) => {
    Rental.findById(id, (error, doc) => {
        if(error) return next(error);
        if(!doc) {
            error = new Error("Not Found");
            error.status = 404;
            return next(error);
        }
        req.rental = doc;
        return next();
    });
});

/***
 *
 * ALL GET REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

// Get all rentals
router.get('/rentals', (req, res) => {
    Rental.find({}, null, (error, results) => {
      if(error) return next(error);
      res.json(results);
    });
});

// Get a specific rental
router.get('/rentals/:rID', (req, res) => {
    res.json(req.rental);
});

/***
 *
 * ALL POST REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

// Route to creating rentals
router.post('/rentals', (req, res, next) => {
    let rental = new Rental(req.body);
    rental.save((error, result) => {
        if(error) return next(error);
        res.status(201);
        res.json(result);
    })
});

/***
 *
 * ALL PUT REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

router.put('/rentals/:rID', (req, res, next) => {
    req.rental.first_name = req.body.first_name;
    req.rental.last_name = req.body.last_name;
    req.rental.phone = req.body.phone;
    req.rental.address = req.body.address;
    req.rental.description = req.body.description;
    req.rental.tenant_gender = req.body.tenant_gender;
    req.rental.num_occupancy = req.body.num_occupancy;
    req.rental.vacancy = req.body.vacancy;
    req.rental.price = req.body.price;
    req.rental.status = req.body.status;
    req.rental.longitude = req.body.longitude;
    req.rental.latitude = req.body.latitude;
    req.rental.utilities = req.body.utilities;
    req.rental.icon = req.body.icon;

    req.rental.save((error, result) => {
       if(error) return next(error);
       res.status(201);
       res.json(result);
    })
});

/***
 *
 * ALL DELETE REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

router.delete('/rentals/:rID', (req, res, next) => {
    req.rental.remove((error) => {
        if(error) return next(error);
        req.rental.save((error, results) => {
           if(error) return next(error);
           res.json(results);
        })
    })
});

module.exports = router;
