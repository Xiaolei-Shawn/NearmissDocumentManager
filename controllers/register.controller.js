﻿var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {

    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/register',
        form: {
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phoneNumber,
            role: 'administrator'
        },

        json: true,

    }, function (error, response, body) {

        if (error) {
            return res.render('register', {error: 'An error occurred'});
        }

        if (req.body.firstName == "") {
            return res.render('register', {error: 'Please enter a first name!'});
        }
        if (req.body.lastName == "") {
            return res.render('register', {error: 'Please enter a last name!'});
        }
        if (req.body.phoneNumber == "") {
            return res.render('register', {error: 'Please enter a phone number!'});
        }
        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                email: req.body.email
            });

        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/login');
    });
});

module.exports = router;