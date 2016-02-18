var jwt = require('jsonwebtoken');//('jwt-simple');
var config = require('config.json');

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
 
    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validate(username, password);

    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    if (dbUserObj) {
 
      // If authentication is success, we will generate a token
      // and dispatch it to the client
 
      res.json(genToken(dbUserObj));
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
 
  findUser: function(username) {
    console.log("find user : " + username);
    //find user with given name
    var dbUserObj = {  
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
 
    return dbUserObj;
  },
}
 
// private method
function genToken(user) {
  var expires = expiresInSecond(3600);
  var token = jwt.sign({user: user, exp: expires}, config.secret, {expiresIn : 3600});
 
 return {
    token: token,
    expires: expires,
    user: user
  };
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