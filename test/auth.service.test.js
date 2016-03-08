var assert = require('assert')
 ,port = require('../server').port
 ,app = require('../server').app
 ,request = require('supertest')
 ,expect = require('expect');

 describe('Test authentication service', function() {
  var token = '',
      payload = {
          "x_key": "joeyzhaozhao@gmail.com",
          "username": "joeyzhaozhao@gmail.com",
          "password": "1234"
      }

  before(function(done) {
    request(app)
      .post('/mapi/mlogin')
      .send(payload)
      .end(function(err, res) {
        var result = JSON.parse(res.text);
        token = result.token;
        done();
      });
  });

  
});