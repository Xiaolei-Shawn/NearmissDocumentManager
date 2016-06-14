var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var usersDb = db.get('users');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.updatePassword = updatePassword;
module.exports = service;

function authenticate(email, password) {
    var deferred = Q.defer();

    usersDb.findOne({email: email}, function (err, user) {
        if (err) deferred.reject(err);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({sub: user._id}, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    usersDb.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // email validation
    usersDb.findOne(
        {email: userParam.email},
        function (err, user) {
            if (err) deferred.reject(err);
            if (user) {
                // email already exists
                deferred.reject('Email "' + userParam.email + ' " is already registered');
            } else {
                createUser();
            }
        });

    // phone validation
    usersDb.findOne(
        {phone: userParam.phone},
        function (err, user) {
            if (err) deferred.reject(err);
            if (user) {
                // phone already exists
                deferred.reject('Phone number "' + userParam.phone + ' " is already registered');
            }
            else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        if (userParam.firstName == "" || userParam.lastName == "" || userParam.phoneNumber == "") {
            deferred.reject("");
        }

        else {
            // add hashed password to user object
            user.hash = bcrypt.hashSync(userParam.password, 10);
            usersDb.insert(
                user,
                function (err, doc) {
                    if (err) deferred.reject(err);

                    deferred.resolve();
                });
        }
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    usersDb.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user.email !== userParam.email) {
            // email has changed so check if the new email is already taken
            usersDb.findOne(
                {email: userParam.email},
                function (err, user) {
                    if (err) deferred.reject(err);

                    if (user) {
                        // email already exists
                        deferred.reject('Email "' + req.body.email + '" is invalid')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstname: userParam.firstname,
            lastname: userParam.lastname,
            email: userParam.email,
            phonenumber: userParam.phone
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        usersDb.findAndModify(
            {_id: _id},
            {$set: set},
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    usersDb.remove(
        {_id: _id},
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}

function updatePassword(_id, userParam) {
    var deferred = Q.defer();

    // validation
    usersDb.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        updateUserPassword(user);

    });

    function updateUserPassword(user) {
        // fields to update
        var set = {
            firstName: user.firstnName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        };
        if (!userParam.oldPassword) {
            deferred.reject({
                err: 'Missing old password'
            });
            return deferred.promise;
        }

        if (!userParam.hasOwnProperty("newPassword")) {
            deferred.reject({
                err: 'Missing new password'
            });
            return deferred.promise;
        }

        // update password if it was entered
        if (bcrypt.compareSync(userParam.oldPassword, user.hash)) {
            set.hash = bcrypt.hashSync(userParam.newPassword, 10);
        } else {
            deferred.reject({
                err: 'Old password mis-match'
            });
        }

        usersDb.findAndModify(
            {_id: _id},
            {$set: set},
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}