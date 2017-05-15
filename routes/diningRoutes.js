'use strict';

let Models = require('./../models');
let mid = require('./../middleware/app');
let express = require('express');
let router = express.Router();

let Dining = Models.Restaurant;

/***
 *
 * BELOW ARE METHODS TO RETRIEVE PARAMETERS FROM THE URL
 *
 */

router.param("dID", (req, res, next, id) => {
    Dining.findById(id, (error, doc) => {
        if(error) return next(error);
        if(!doc) {
            let error = new Error('Not Found');
            error.status(404);
            return next(error);
        }
        req.dining = doc;
        return next();
    })
});

router.param("mID", (req, res, next, id) => {
    let doc = req.dining.menu.id(id);
    if(!doc) {
        let error = new Error('Not Found');
        error.status(404);
        return next(error);
    }
    req.dining.menuItem = doc;
    return next();
});

/***
 *
 * ALL GET REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

router.get('/dining', (req, res) => {
   Dining.find({}, null, (error, Dining) => {
       if(error) return next(error);
       res.json(Dining);
   })
});

router.get('/dining/:dID/menus', (req, res) =>{
    res.json(req.dining.menu);
});

router.get('/dining/:dID/menus/:mID', (req, res) => {
   res.json(req.dining.menuItem);
});

/***
 *
 * ALL POST REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

router.post('/dining', (req, res, next) => {
    let dining = new Dining(req.body);
    dining.save((error, results) => {
        if (error) return next(error);
        res.status(201);
        res.json(results);
    })
});

router.post('/dining/:dID/menus', (req, res, next) => {
   req.dining.menu.push(req.body[dining]);
   req.dining.save((error, results) => {
       if(error) return next(error);
       res.status(201);
       res.json(results);
   })
});

router.post('/dining/:dID/menus/:mID/sizes', (req, res, next) => {
    req.dining.menuItem.variations.push(req.body[size]);
    req.dining.save((error, results) => {
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

router.put('/dining/:dID', (req, res, next) => {
    req.dining.update(req.body, (error, results) => {
        if(error) return next(error);
        res.json(results);
    })
});

/***
 *
 * ALL DELETE REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

 router.delete('/dining/:dID', (req, res, next) => {
    req.dining.remove((error) => {
        if(error) return next(error);
        req.dining.save((error, results) => {
            if (error) return next(error);
            res.status(201);
            res.json(results);
        })
    })
 });

router.delete('/dining/:dID/menus/:mID', (req, res, next) => {
   req.dining.menuItem.remove((error) => {
       if(error) return next(error);
       req.dining.save((error, results) => {
           if (error) return next(error);
           res.status(201);
           res.json(results);
       })
   })
});



module.exports = router;
