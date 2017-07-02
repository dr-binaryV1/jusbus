'use strict';

let Models = require('./../models');
let express = require('express');
let router = express.Router();

let Users = Models.User;

router.param("usID", (req,res,next,id) => {
    Users.findById(id, (error, doc) => {
        if (error) return next(error);
        if (!doc) {
            error = new Error("Not Found");
            error.status = 404;
            return next(error);
        }
        req.user = doc;
        return next();
    });
});

router.param("ttID", (req, res, next, id) => {
   let doc = req.user.timetable.id(id);
   if(!doc) {
       let error = new Error('Not Found');
       error.status = 404;
       return next(error);
   }
   req.user.timetableEntry = doc;
   return next();
});

/***
 *
 * ALL GET REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

// Route for users collection
router.get('/users', (req, res, next) => {
    // Return all the users
    Users.find({}, null, (error, users) => {
        if(error) return next(error);
        res.json(users);
    });
});

// Get a specific user from the collection
router.get('/users/:usID', (req, res) => {
    // Return the specific user
    res.json(req.user);
});

// Get all timetable entries
router.get('/users/:usID/timetable', (req, res) => {
    res.json(req.user.timetable);
});

/***
 *
 * ALL POST REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

// Route for creating users
router.post('/users', (req, res, next) => {
    let user = new Users(req.body);
    user.save((error, user) => {
        if(error) return next(error);
        res.status(201);
        res.json(user);
    })
});

// Route to create timetable
router.post('/users/:usID/timetable', (req, res, next) => {
   for(let TT in req.body){
       if(req.body.hasOwnProperty(TT)){
           req.user.timetable.push(req.body[TT]);
       }
   }

   req.user.save((error, results) => {
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

// Update for specific user
router.put('/users/:usID', (req, res, next) => {
   req.user.first_name = req.body.first_name;
   req.user.last_name = req.body.last_name;
   req.user.username = req.body.username;
   req.user.email = req.body.email;
   req.user.phone = req.body.phone;
   req.user.faculty = req.body.faculty;
   req.user.currentYear = req.body.currentYear;
   req.user.updatedAt = Date.now();

   req.user.save((error, result) => {
       if(error) return next(error);
       res.status(201);
       res.json(result);
   })
});

// Update for specific timetable entry
router.put('/users/:usID/timetable/:ttID', (req, res, next) => {
    req.user.timetableEntry.moduleCode = req.body.moduleCode;
    req.user.timetableEntry.moduleName = req.body.moduleName;
    req.user.timetableEntry.sessionType = req.body.sessionType;
    req.user.timetableEntry.start = req.body.start;
    req.user.timetableEntry.end = req.body.end;
    req.user.timetableEntry.day = req.body.day;
    req.user.timetableEntry.classroom = req.body.classroom;
    req.user.timetableEntry.tutor = req.body.tutor;
    req.user.timetableEntry.status = req.body.status;

    req.user.save((error, results) => {
        if(error) return next(error);
        res.status(201);
        res.json(results);
    })
});

/***
 *
 * ALL DELETE REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

// Delete a specific user
router.delete('/users/:usID', (req, res, next) => {
    req.user.remove((error) => {
        req.user.save((error, results) => {
            if(error) return next(error);
            res.status(201);
            res.json(results);
        });
    });
});

// Delete a specific timetable entry
router.delete('/users/:usID/timetable/:ttID', (req, res, next) => {
    req.user.timetableEntry.remove((error) => {
       req.user.save((error, results) => {
           if(error) return next(error);
           res.status(201);
           res.json(results);
       });
   });
});

module.exports = router;
