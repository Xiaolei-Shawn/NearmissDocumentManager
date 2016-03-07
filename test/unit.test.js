var assert = require('assert')
 ,boot = require('../server').boot
 ,shutdown = require('../server').shutdown
 ,port = require('../server').port
 ,app = require('../server').app
 ,request = require('supertest')
 ,expect = require('expect');


  describe('Test Route with Token', function() {
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

  it('should not be able to consume the route /test since no token was sent', function(done) {
    request(app)
      .get('/mapi/template/nearmiss-template1')
      .expect(401, done);
  });


  it('should be able to consume the route /test since token valid was sent', function(done) {
    request(app)
      .get('/mapi/template/nearmiss-template1')
      .set('x-access-token', token)
      .expect(200, done);
  });
});

