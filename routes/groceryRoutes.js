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

 router.param("gID", (req,res,next,id) => {
     Grocery.findById(id, (error, doc) => {
         if(error) return next(error);
         if(!doc) {
             error = new Error("Not Found");
             error.status = 404;
             return next(error);
         }
         req.grocery = doc;
         return next();
     });
 });

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

 // Route to update university
 router.put('/grocery/:gID', (req, res, next) => {
    req.grocery.name = req.body.name;
    req.grocery.description = req.body.description;
    req.grocery.address = req.body.address;
    req.grocery.openTime = req.body.openTime;
    req.grocery.closeTime = req.body.closeTime;
    req.grocery.longitude = req.body.longitude;
    req.grocery.latitude = req.body.latitude;
    req.grocery.icon = req.body.icon;

    req.grocery.save((error, result) => {
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
 // Delete a specific university
 router.delete("/grocery/:gID", (req, res, next) => {
     req.grocery.remove((error) => {
         if(error) return next(error);
         req.grocery.save((error, results) => {
             if(error) return next(error);
             res.status(201);
             res.json(results);
         });
     });
 });

module.exports = router;
