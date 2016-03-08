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

  it('should not be able to consume the route /mapi/* since no token was sent', function(done) {
    request(app)
      .get('/mapi/template/nearmiss-template1')
      .expect(401, done);
  });


  it('should be able to consume the route /mapi/* since token valid was sent', function(done) {
    request(app)
      .get('/mapi/template/nearmiss-template1')
      .set('x-access-token', token)
      .expect(200, done);
  });

  it('should not be able to consume web api on mobile', function(done) {
    request(app)
      .get('/mapi/web/templates')
      .set('x-access-token', token)
      .expect(401)
      .end(function (err, res) {
        if(err) throw err;
        res.body.message.should.be("Unaccessable path from mobile")
      })
      done()
  });

  it('should not be able to get token by nonexistent user', function(done) {
    request(app)
      .post('/mapi/mlogin')
      .send({"x_key": "user@test.com",
          "username": "user@test.com",
          "password": "test"})
      .expect(401)
      .end(function (err, res) {
        if(err) throw err;
        res.body.message.should.be("Nonexistent User")
      })
      done()
  });

  it('should not return token when no key is sent', function(done) {
    request(app)
      .post('/mapi/mlogin')
      .expect(401)
      .end(function (err, res) {
        if(err) throw err;
        res.body.message.should.be("Invalid Token and Key")
      })
      done()
  });


});

