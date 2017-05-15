'use strict';

let Models = require('./../models');
let mid = require('./../middleware/app');
let express = require('express');
let router = express.Router();

let University = Models.University;

/***
 *
 * BELOW ARE METHODS TO RETRIEVE PARAMETERS FROM THE URL
 *
 */

router.param("uID", (req,res,next,id) => {
    University.findById(id, (error, doc) => {
        if(error) return next(error);
        if(!doc) {
            error = new Error("Not Found");
            error.status = 404;
            return next(error);
        }
        req.university = doc;
        return next();
    });
});

// Access id from request parameter
// Look up id in mongoDB and return document
router.param("fID", (req,res,next,id) => {
    let doc = req.university.faculties.id(id);
    if(!doc) {
        let error = new Error("Not Found");
        error.status = 404;
        return next(error);
    }
    req.university.faculty = doc;
    return next();
});

router.param("cID", (req,res,next,id) => {
    let doc = req.university.faculty.classrooms.id(id);
    if(!doc) {
        let error = new Error("Not Found");
        error.status = 404;
        return next(error);
    }
    req.university.faculties.classroom = doc;
    next();
});

router.param("clID", (req, res,next,id) => {
    let doc = req.university.clubs.id(id);
    if(!doc) {
        let error = new Error("Not Found");
        error.status = 404;
        return next(error);
    }
    req.university.club = doc;
    next();
});

router.param("foID", (req, res, next, id) => {
   let doc = req.university.foods.id(id);
   if(!doc) {
       let error = new Error("Not Found");
       error.status = 404;
       return next(error);
   }
   req.university.food = doc;
   next();
});

router.param("aID", (req, res, next, id) => {
   let doc = req.university.atms.id(id);
   if(!doc) {
       let error = new Error('Not Found');
       error.status = 404;
       return next(error);
   }
   req.university.atm = doc;
   next();
});

router.param("bID", (req, res, next, id) => {
    let doc = req.university.banks.id(id);
    if (!doc) {
        let error = new Error('Not Found');
        error.status = 404;
        return next(error);
    }
    req.university.bank = doc;
    next();
});

router.param("ubID", (req, res, next, id) => {
   let doc = req.university.universityBuildings.id(id);
   if(!doc) {
       let error = new Error('Not Found');
       error.status = 404;
       return next(error);
   }
   req.university.universityBuilding = doc;
   next();
});

/***
 *
 * ALL GET REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

// Route for all university
// Get all data
router.get('/university', (req, res, next) => {
    University.find({}, null, (error, university) => {
        if(error) return next(error);
        res.json(university);
    });
});

// Route to get a specific University
router.get('/university/:uID', (req, res) => {
   res.json(req.university);
});

// Route to get all faculties
router.get('/university/:uID/faculties', (req, res) => {
    // Return all faculties
    res.json(req.university.faculties);
});

// Route to get specific faculty
router.get('/university/:uID/faculties/:fID', (req, res) => {
    res.json(req.university.faculty);
});

// Route to get all classrooms for a specific faculty
router.get('/university/:uID/faculties/:fID/classrooms', (req, res) => {
    res.json(req.university.faculty.classrooms);
});

// Route to get specific classroom
router.get('/university/:uID/faculties/:fID/classrooms/:cID', (req, res) => {
    res.json(req.university.faculties.classroom);
});

// Route to get clubSchema
router.get('/university/:uID/clubs', (req, res) => {
    res.json(req.university.clubs);
});

// Route to get all food locations
router.get('/university/:uID/foods', (req, res) => {
   res.json(req.university.foods);
});

// Route to get a specific food shop
router.get('/university/:uID/foods/:foID', (req, res) => {
   res.json(req.university.food);
});

// Route to get all atms
router.get('/university/:uID/atms', (req, res) => {
   res.json(req.university.atms);
});

// Route to get all buildings
router.get('university/:uID/buildings', (req, res) => {
   res.json(req.university.universityBuildings);
});

// Route to get a specific atm
router.get('/university/:uID/atms/:aID', (req, res) => {
   res.json(req.university.atm);
});

// Route to get all banks
router.get('/university/:uID/banks', (req, res) => {
   res.json(req.university.banks);
});

// Route to get specific bank
router.get('/university/:uID/banks/:bID', (req, res) => {
   res.json(req.university.bank);
});

// Route to get all university buildings
router.get('/university/:uID/buildings', (req, res) => {
   res.json(req.university.universityBuildings);
});

// Route tp get a specific building
router.get('/university/:uID/buildings/:ubID', (req, res) => {
   res.json(req.university.universityBuilding);
});

/***
 *
 * ALL POST REQUESTS FOR SERVER ARE BELOW
 * ROUTES ARE GROUPED TOGETHER
 *
 */

// Route to creating university
router.post('/university', (req, res, next) => {
    let university = new University(req.body);
    university.save((error, results) => {
        if(error) return next(error);
        res.status(201);
        res.json(results);
    })
});

// Route for creating faculties in university
router.post('/university/:uID/faculties', (req, res, next) => {
    req.university.faculties.push(req.body);
    req.university.save((error, results) => {
        if (error) return next(error);
        res.status(201);
        res.json(results);
    });
});

// Route to create classroom in faculties
router.post('/university/:uID/faculties/:fID/classrooms', (req, res, next) => {
    req.university.faculty.classrooms.push(req.body);
    req.university.save((error, results) => {
        if (error) return next(error);
        res.status(201);
        res.json(results);
    });
});

// Route to create clubs in university
router.post('/university/:uID/clubs', (req, res, next) => {
    req.university.clubs.push(req.body);
    req.university.save((error, results) => {
        if(error) return next(errors);
        res.status(201);
        res.json(results);
    });
});

// Route to create new food location
router.post('/university/:uID/foods', (req, res, next) => {
    req.university.foods.push(req.body);
    req.university.save((error, result) => {
       if(error) return next(error);
       res.status(201);
       res.json(result);
   });
});

// Route to create new atm
router.post('/university/:uID/atms', (req, res, next) => {
    req.university.atms.push(req.body);
    req.university.save((error, result) => {
       if(error) return next(error);
       res.status(201);
       res.json(result);
    });
});

// Route to create new buildings
router.post('/university/:uID/buildings', (req, res, next) => {
    req.university.universityBuildings.push(req.body);
    req.university.save((error, result) => {
      if(error) return next(error);
      res.status(201);
      res.json(result);
    })
})

// Route to create new bank
router.post('/university/:uID/banks', (req, res, next) => {
   req.university.banks.push(req.body);
   req.university.save((error, result) => {
      if(error) return next(error);
      res.status(201);
      res.json(result);
   });
});

// Route to create new building
router.post('/university/:uID/buildings', (req, res, next) => {
   req.university.universityBuildings.push(req.body);
   req.university.save((error, results) => {
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
router.put('/university/:uID', (req, res, next) => {
   req.university.name = req.body.name;
   req.university.description = req.body.description;
   req.university.address = req.body.address;
   req.university.tel = req.body.tel;
   req.university.openTime = req.body.openTime;
   req.university.closeTime = req.body.closeTime;
   req.university.longitude = req.body.longitude;
   req.university.latitude = req.body.latitude;
   req.university.icon = req.body.icon;

   req.university.save((error, result) => {
       if(error) return next(error);
       res.status(201);
       res.json(result);
   })
});

// Route to update faculty
router.put('/university/:uID/faculties/:fID', (req, res, next) => {
    req.university.faculty.name = req.body.name;
    req.university.faculty.description = req.body.description;
    req.university.faculty.latitude = req.body.latitude;
    req.university.faculty.longitude = req.body.longitude;
    req.university.faculty.icon = req.body.icon;

    req.university.save((err, result) => {
        if (err) return next(err);
        res.status(201);
        res.json(result);
    });
});

// Route for updating classrooms
router.put('/university/:uID/faculties/:fID/classrooms/:cID', (req, res, next) => {
    req.university.faculties.classroom.update(req.body, (error, result) => {
        if(error) return next(error);
        res.json(result);
    });
});

// Route to update a food shop
router.put('/university/:uID/foods/:foID', (req, res, next) => {
  req.university.universityBuilding.name = req.body.name;
  req.university.universityBuilding.description = req.body.description;
  req.university.universityBuilding.openTime = req.body.openTime;
  req.university.universityBuilding.closeTime = req.body.closeTime;
  req.university.universityBuilding.latitude = req.body.latitude;
  req.university.universityBuilding.longitude = req.body.longitude;
  req.university.universityBuilding.icon = req.body.icon;

   req.university.save((error, result) => {
       if(error) return next(error);
       res.status(201);
       res.json(result);
   })
});

// Route to update a food shop
router.put('/university/:uID/clubs/:clID', (req, res, next) => {
  req.university.universityBuilding.name = req.body.name;
  req.university.universityBuilding.description = req.body.description;
  req.university.universityBuilding.openTime = req.body.openTime;
  req.university.universityBuilding.closeTime = req.body.closeTime;
  req.university.universityBuilding.latitude = req.body.latitude;
  req.university.universityBuilding.longitude = req.body.longitude;
  req.university.universityBuilding.icon = req.body.icon;

   req.university.save((error, result) => {
       if(error) return next(error);
       res.status(201);
       res.json(result);
   })
});

// Route to update atm
router.put('/university/:uID/atms/:aID', (req, res, next) => {
  req.university.universityBuilding.name = req.body.name;
  req.university.universityBuilding.description = req.body.description;
  req.university.universityBuilding.openTime = req.body.openTime;
  req.university.universityBuilding.closeTime = req.body.closeTime;
  req.university.universityBuilding.latitude = req.body.latitude;
  req.university.universityBuilding.longitude = req.body.longitude;
  req.university.universityBuilding.icon = req.body.icon;

    req.university.save((error, result) => {
        if(error) return next(error);
        res.status(201);
        res.json(result);
    })
});

// Route to update bank
router.put('/university/:uID/banks/:bID', (req, res, next) => {
  req.university.universityBuilding.name = req.body.name;
  req.university.universityBuilding.description = req.body.description;
  req.university.universityBuilding.openTime = req.body.openTime;
  req.university.universityBuilding.closeTime = req.body.closeTime;
  req.university.universityBuilding.latitude = req.body.latitude;
  req.university.universityBuilding.longitude = req.body.longitude;
  req.university.universityBuilding.icon = req.body.icon;

    req.university.save((error, result) => {
        if(error) return next(error);
        res.status(201);
        res.json(result);
    })
});

// Route to update building
router.put('/university/:uID/buildings/:ubID', (req, res, next) => {
    req.university.universityBuilding.name = req.body.name;
    req.university.universityBuilding.description = req.body.description;
    req.university.universityBuilding.openTime = req.body.openTime;
    req.university.universityBuilding.closeTime = req.body.closeTime;
    req.university.universityBuilding.latitude = req.body.latitude;
    req.university.universityBuilding.longitude = req.body.longitude;
    req.university.universityBuilding.icon = req.body.icon;

    req.university.save((error, result) => {
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
router.delete("/university/:uID", (req, res, next) => {
    req.university.remove((error) => {
        if(error) return next(error);
        req.university.save((error, results) => {
            if(error) return next(error);
            res.status(201);
            res.json(results);
        });
    });
});

// Delete a specific faculty
router.delete("/university/:uID/faculties/:fID", (req, res, next) => {
   req.university.faculty.remove((error) => {
       if(error) return next(error);
       req.university.save((error, results) => {
           if(error) return next(error);
           res.json(results);
       })
   })
});

// Delete a specific club
router.delete("/university/:uID/clubs/:clID", (req, res, next) => {
    req.university.club.remove((error) => {
        if(error) return next(error);
        req.university.save((error, results) => {
            if(error) return next(error);
            res.json(results);
        })
    })
});

// Delete a specific classroom
router.delete("/university/:uID/faculties/:fID/classrooms/:cID", (req, res, next) => {
   req.university.faculties.classroom.remove((error) => {
       if(error) return next(error);
       req.university.save((error, results) => {
           if(error) return next(error);
           res.json(results);
       })
   })
});

// Delete a specific foodshop
router.delete("/university/:uID/foods/:foID", (req, res, next) => {
   req.university.food.remove((error) => {
       if(error) return next(error);
       req.university.save((error, result) => {
           if(error) return next(error);
           res.json(result);
       })
   })
});

// Delete a specific atm
router.delete('/university/:uID/atms/:aID', (req, res, next) => {
   req.university.atm.remove((error) => {
       if(error) return next(error);
       req.university.save((error, result) => {
           if(error) return next(error);
           res.json(result);
       })
   })
});

// Delete a specific bank
router.delete('/university/:uID/banks/:bID', (req, res, next) => {
   req.university.bank.remove((error) => {
       if(error) return next(error);
       req.university.save((error, result) => {
           if(error) return next(error);
           res.json(result);
       })
   })
});

// Delete a specific building
router.delete('/university/:uID/buildings/:ubID', (req, res, next) => {
   req.university.universityBuilding.remove((error) => {
       if(error) return next(error);
       req.university.save((error, result) => {
           if(error) return next(error);
           res.json(result);
       })
   })
});


module.exports = router;
