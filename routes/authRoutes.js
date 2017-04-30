'use strict';

let Models = require('./../models');
let express = require('express');
let router = express.Router();

let Users = Models.User;

// POST /login
router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        Users.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                let err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            }  else {
                req.session.userId = user._id;

                res.json({
                    message: "logged in successfully",
                });
            }
        });
    } else {
        let err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
});

// GET /logout
router.get('/logout', (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy((err) => {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/university');
            }
        });
    }
});

module.exports = router;