var jwt = require('jsonwebtoken');//('jwt-simple');
var config = require('config.json');
var dataService = require('services/data.service');
var S = require('string');
var _ = require('lodash');

var auth = {
 
  login: function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    if(S(username).contains('@')){
      //email used in username
      dataService.validateUser(username, null, password)
        .then(function(user){
            dataService.getAllTemplates()
            .then(function(allTemplates){
              res.json( {
                token: genToken(user),
                user: _.omit(user, ['hash', '_id']),
                //templates: _.map(allTemplates, _.property('templateid'))
                templateinfo: _.map(allTemplates, function(template){
                  return {
                    templatename: template.name,
                    templateid: template.templateid
                  }
                })
              });
              return;
            })
            .catch(function(err){
              res.json( {
                token: genToken(user),
                expires: expires,
                user: user,
                templateinfo: err
              })
            })
            //res.json(genToken(user));
        })
        .catch(function(err){
            res.status(401);
            res.json({
              "status": 401,
              "message": "Invalid credentials for given email"
            });
            return;
        });
    } else {
      //telephone used in username
       dataService.validateUser(null, username, password)
        .then(function(user){
             dataService.getAllTemplates()
            .then(function(allTemplates){
              res.json( {
                token: genToken(user),
                user: _.omit(user, ['hash', '_id']),
                //templates: _.map(allTemplates, _.property('templateid'))
                templateinfo: _.map(allTemplates, function(template){
                  return {
                    templatename: template.name,
                    templateid: template.templateid
                  }
                })
              });
              return;
            })
            .catch(function(err){
              res.json( {
                token: genToken(user),
                expires: expires,
                user: user,
                templateinfo: err
              })
            })
        })
        .catch(function(err){
            res.status(401);
            res.json({
              "status": 401,
              "message": "Invalid credentials for given phone number"
            });
            return;
        });
    }
  },
 
  validate: function(username, password) {
    //Validate the given credentials
    var dbUserObj = {  
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
 
    return dbUserObj;
  },
 
  findUser: function(email, telephone) {
    return dataService.findUser(email, telephone);
  },
}
 
// private method
function genToken(user) {
  var expires = expiresInSecond(3600);
  var token = jwt.sign({user: user, exp: expires}, config.secret, {expiresIn : 3600});
  return token;

}
 
function expiresInDay(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
function expiresInHour(numHours) {
  var dateObj = new Date();
  return dateObj.setHours(dateObj.getHours() + numHours);
}
function expiresInSecond(numSeconds) {
  var dateObj = new Date();
  return dateObj.setSeconds(dateObj.getSeconds() + numSeconds);
}
 
module.exports = auth;