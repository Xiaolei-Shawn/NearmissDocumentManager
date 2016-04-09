var jwt = require('jsonwebtoken');//('jwt-simple');
var config = require('config.json');
var dataService = require('services/data.service');
var S = require('string');
var _ = require('lodash');
var Q = require('q');

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
          Q.all([dataService.getAllTemplates(), dataService.getAllReports()])
          .then(function(data){
               res.status(200);
               res.json({
                token: genToken(user),
                user: user,
                //templates: _.map(allTemplates, _.property('templateid'))
                templates: _.map(data[0], function(template){
                              return {
                                title: template.title,
                                type: template.type,
                                _id: template._id
                              }
                            }),
                reports: _.map(data[1], function(report){
                              return {
                                title: report.title,
                                type: report.type,
                                _id: report._id
                              }
                            }),
              });
          })
          .catch(function(err){
            console.log("getAllTemplates or getAllReports goes wrong");
          })
          /**
          dataService.getAllTemplates()
            .then(function(allTemplates){
                dataService.getAllReports()
                  .then(function(allReports){
                    res.status(200);
                     res.json({
                      token: genToken(user),
                      user: user,
                      //templates: _.map(allTemplates, _.property('templateid'))
                      templates: _.map(allTemplates, function(template){
                                    return {
                                      title: template.title,
                                      type: template.type,
                                      _id: template._id
                                    }
                                  }),
                      reports: _.map(allReports, function(report){
                                    return {
                                      title: report.title,
                                      type: report.type,
                                      _id: report._id
                                    }
                                  }),
                    });
                  })
                  .catch(function(err){
                    res.status(200);
                     res.json({
                      token: genToken(user),
                      user: user,
                      //templates: _.map(allTemplates, _.property('templateid'))
                      templates: _.map(allTemplates, function(template){
                                    return {
                                      title: template.title,
                                      type: template.type,
                                      _id: template._id
                                    }
                                  }),
                      reports: err
                    });
                  })
            })
            .catch(function(err){
                res.status(200);
                     res.json({
                      token: genToken(user),
                      user: user,
                      //templates: _.map(allTemplates, _.property('templateid'))
                      templates: err
                });
            })
            //res.json(genToken(user));
            **/
        })
        .catch(function(err){
            res.status(401);
            res.json({
              "status": 401,
              "message": "Invalid credentials for given email",
              "error": err
            });
            return;
        });
    } else {
      //telephone used in username
       dataService.validateUser(null, username, password)
        .then(function(user){
             dataService.getAllTemplates()
            .then(function(allTemplates){
              res.status(200);
              res.json( {
                token: genToken(user),
                user: user,
                //templates: _.map(allTemplates, _.property('templateid'))
                templateinfo: _.map(allTemplates, function(template){
                  return {
                    title: template.title,
                    type: template.type,
                    _id: template._id
                  }
                })
              });
              return;
            })
            .catch(function(err){
              res.status(401);
              res.json( {
                "status": 401,
                "message": "Not a valid user",
                "error": err
              });
            })
        })
        .catch(function(err){
            res.status(401);
            res.json({
              "status": 401,
              "message": "Invalid credentials for given phone number",
              "error": err
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
  var token = jwt.sign({user: user}, config.secret, {expiresIn : 60 * 60 * 2});
  return token;

}
 
module.exports = auth;