var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var userCollection = db.get('users');
var templateCollection = db.get('template');
var reportCollection = db.get('report');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var dataService = {
    getOneTemplate: function (_id) {
        var deferred = Q.defer();

        templateCollection.findOne({_id: _id}, function (err, template) {
            if (err) deferred.reject(err);

            if (template) {
                deferred.resolve(_.omit(template, '_hash'));
            } else {
                // template not found
                deferred.resolve();
            }
        });

        return deferred.promise;
    },

    getOneReport: function (_id) {
        var deferred = Q.defer();

        reportCollection.findOne({_id: _id}, function (err, report) {
            if (err) deferred.reject(err);
            if (report) {
                deferred.resolve(_.omit(report, 'hash'));
            } else {
                // report not found
                deferred.resolve();
            }
        });

        return deferred.promise;
    },
    getAllTemplates: function () {
        var deferred = Q.defer();

        templateCollection.find({}, function (err, templates) {
            if (err) deferred.reject(err);

            if (templates) {
                deferred.resolve(templates);
            } else {
                // template not found
                deferred.resolve();
            }
        });

        return deferred.promise;
    },

    getAllReports: function () {
        var deferred = Q.defer();

        reportCollection.find({}, function (err, reports) {
            if (err) deferred.reject(err);

            if (reports) {
                deferred.resolve(reports);
            } else {
                // report not found
                deferred.resolve();
            }
        });

        return deferred.promise;
    },

    getSomeReports: function (key, value) {
        var deferred = Q.defer();
        var query = {};
        query[key] = value;
        reportCollection.find(query, function (err, reports) {
            if (err) deferred.reject(err);

            if (reports) {
                deferred.resolve(reports);
            } else {
                // report not found
                deferred.resolve();
            }
        });

        return deferred.promise;
    },

    createReport: function (report) {
        var deferred = Q.defer();

        reportCollection.insert(report, function (err, report) {
            if (err) deferred.reject(err);

            if (report) {
                deferred.resolve(report);
            } else {
                // report insert failed
                deferred.resolve();
            }
        });
        return deferred.promise;
    },

    createTemplate: function (template) {
        var deferred = Q.defer();

        templateCollection.insert(template, function (err, template) {
            if (err) deferred.reject(err);

            if (template) {
                deferred.resolve(template);
            } else {
                // template insert failed
                deferred.resolve();
            }
        });

        return deferred.promise;
    },

    updateTemplate: function (template, _id) {
        var deferred = Q.defer();

        templateCollection.findById({_id: _id}, function (err, targetTemplate) {
            if (err) deferred.reject(err);

            if (targetTemplate) {
                templateCollection.findAndModify(
                    {_id: targetTemplate._id},
                    {$set: template},
                    function (updateErr, updatedTemplate) {
                        if (err) deferred.reject(updateErr);

                        if (updatedTemplate) {
                            deferred.resolve(updatedTemplate);
                        } else {
                            deferred.resolve();
                        }
                    });
            } else {
                // template not found
                deferred.resolve();
            }
        });


        return deferred.promise;
    },

    deleteTemplate: function (_id) {
        var deferred = Q.defer();

        templateCollection.remove({_id: _id}, function (err) {
            if (err) deferred.reject(err);

            deferred.resolve(true);
        });

        return deferred.promise;
    },

    updateReport: function (targetReport, _id) {
        var deferred = Q.defer();

        reportCollection.findById({_id: _id}, function (err, targetReport) {
            if (err) deferred.reject(err);

            if (targetReport) {
                reportCollection.findAndModify(
                    {_id: targetReport._id},
                    {$set: targetReport},
                    function (updateErr, targetReport) {
                        if (err) deferred.reject(updateErr);

                        if (targetReport) {
                            deferred.resolve(targetReport);
                        } else {
                            deferred.resolve();
                        }
                    });
            } else {
                // template not found
                deferred.resolve();
            }
        });


        return deferred.promise;
    },

    deleteReport: function (_id) {
        var deferred = Q.defer();

        reportCollection.remove({_id: _id}, function (err) {
            if (err) deferred.reject(err);

            deferred.resolve(true);
        });

        return deferred.promise;
    },

    findUser: function (email, telephone) {
        var deferred = Q.defer();

        if (telephone) {
            userCollection.findOne({phone: telephone}, function (err, user) {
                if (err) deferred.reject(err);

                if (user) {
                    deferred.resolve(_.omit(user, 'hash'));
                } else {
                    deferred.resolve();
                }
            })
        } else if (email) {
            userCollection.findOne({email: email}, function (err, user) {
                if (err) deferred.reject(err);

                if (user) {
                    deferred.resolve(_.omit(user, 'hash'));
                } else {
                    deferred.resolve();
                }
            })
        }
        return deferred.promise;
        //For testing
        /*var dbUserObj = {
         name: 'arvind',
         role: 'admin',
         username: 'arvind@myapp.com'
         };

         return dbUserObj;*/
    },
    validateUser: function (email, telephone, password) {
        if (password) {
            var deferred = Q.defer();

            if (telephone) {
                userCollection.findOne({phone: telephone}, function (err, user) {
                    if (err) deferred.reject(err);

                    if (user && bcrypt.compareSync(password, user.hash)) {
                        deferred.resolve(user);
                    } else {
                        deferred.resolve();
                    }
                })
            } else if (email) {
                userCollection.findOne({email: email}, function (err, user) {
                    if (err) deferred.reject(err);

                    if (user && bcrypt.compareSync(password, user.hash)) {
                        deferred.resolve(user);
                    } else {
                        deferred.resolve();
                    }
                })
            }
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }
};

module.exports = dataService;