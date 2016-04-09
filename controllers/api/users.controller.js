var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
var JSON = require('JSON');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.post('/create', createUser);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);
router.put('/update/:_id', updatePassword);

module.exports = router;

function authenticateUser(req, res) {
    userService.authenticate(req.body.email, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

//Register an admin user that has role 'administrator'
function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

//Create a normal user for mobile that has role 'user'
function createUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own profile
        return res.status(401).send('You can only update your own profile');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own profile
        return res.status(401).send('You can only delete your own profile');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
    });
}

function updatePassword(req, res){
    var userid = req.params._id;
    userService.updatePassword(userid, req.body)
        .then(function() {
            res.sendStatus(200)
            .send({
                "status": 200,
                "message": "Update password successfullly."
            });
        })
        .catch(function(err) {
            res.status(400)
                .send(err);
        })
}