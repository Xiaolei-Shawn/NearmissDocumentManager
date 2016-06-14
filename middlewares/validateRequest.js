var jwt = require('jsonwebtoken');//require('jwt-simple');
var findUser = require('../services/auth.service').findUser;
var config = require('config.json');
var S = require('string');
module.exports = function (req, res, next) {

    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe.

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();

    //Deleting&Updating template and deleting report are not allowed from mobile

    if (req.url.indexOf('users') >= 0) {
        if (req.method !== 'GET' && req.method !== 'PUT' && req.method !== 'POST') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Inaccessible path from mobile"
            });
            return;
        }
    } else if (req.url.indexOf('resources') >= 0) {
        if (req.url.indexOf('mlogin') < 0 && ((req.method === 'PUT' && S(req.url).contains('template')) || req.method === 'DELETE')) {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Inaccessible path from mobile"
            });
            return;
        }
    } else {
        res.status(404);
        res.json({
            "status": 404,
            "message": "Nonexistent path"
        });
        return;
    }
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

    if (token || key) {
        try {
            if (token) {
                //token : {user : user, exp : expired}
                jwt.verify(token, config.secret, function (err, decoded) {
                    if (err) {
                        res.status(400);
                        res.json({
                            "status": 400,
                            "expired": true,
                            "err": err
                        });
                        return;
                    }
                    /*if (decoded.exp <= Date.now()) {
                     res.status(400);
                     res.json({
                     "status": 400,
                     "message": "Token Expired"
                     });
                     return;
                     }*/

                    if (key) {

                    } else {
                        key = decoded.user.email;
                        findUser(key, null)
                            .then(function (user) {
                                if (req.url.indexOf('/mapi/') >= 0) {
                                    next(); // To move to next middleware
                                } else {
                                    res.status(403);
                                    res.json({
                                        "status": 403,
                                        "message": "Not Authorized"
                                    });
                                }
                            })
                            .catch(function (err) {
                                // No user with this name exists, respond back with a 401
                                res.status(401);
                                res.json({
                                    "status": 401,
                                    "message": "Unexisted User"
                                });
                            });
                    }
                });
            }

            findUser(key, null)
                .then(function (user) {
                    if (req.url.indexOf('/mapi/') >= 0) {
                        next(); // To move to next middleware
                    } else {
                        res.status(403);
                        res.json({
                            "status": 403,
                            "message": "Not Authorized"
                        });
                    }
                })
                .catch(function (err) {
                    // No user with this name exists, respond back with a 401
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Nonexistent User"
                    });
                });

        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token and Key"
        });
    }
};