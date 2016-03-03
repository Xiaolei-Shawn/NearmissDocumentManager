var jwt = require('jsonwebtoken');//require('jwt-simple');
var findUser = require('../services/auth.service').findUser;
var config = require('config.json');
var S = require('string');
module.exports = function(req, res, next) {
 
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe. 
 
  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();

  //Querying web data is not allowed from mobile
/*  if (S(req.url).contains('web')) {
          res.status(401);
          res.json({
            "status": 401,
            "message": "Unaccessable path from mobile"
          });
          return;
  }*/
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
  
  if (token || key) {
    try {
      
      if(token){
        //token : {user : user, exp : expired}
        jwt.verify(token, config.secret, function(err, decoded){
          if (err) {
            
            res.status(400);
            res.json(err);
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
        
          if(key){

          } else {
            key = decoded.user.email;
            findUser(key, null)
            .then(function(user){
              if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/mapi/') >= 0)) {
                next(); // To move to next middleware
              } else {
                res.status(403);
                res.json({
                  "status": 403,
                  "message": "Not Authorized"
                });
                return;
              }
            })
            .catch(function(err){
               // No user with this name exists, respond back with a 401
                res.status(401);
                res.json({
                  "status": 401,
                  "message": "Unexisted User"
                });
                return;
            });
          }
        });
      } 


      findUser(key, null)
      .then(function(user){
        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/mapi/') >= 0)) {
          next(); // To move to next middleware
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
          return;
        }
      })
      .catch(function(err){
         // No user with this name exists, respond back with a 401
          res.status(401);
          res.json({
            "status": 401,
            "message": "Unexisted User"
          });
          return;
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
      "message": "Invalid Token or Key"
    });
    return;
  }
};