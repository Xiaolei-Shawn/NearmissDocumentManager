var assert = require('assert');
var boot = require('../server').boot;
var shutdown = require('../server').shutdown;
var port = require('../server').port;
var superagent = require('superagent');
var expect = require('expect.js');

describe('/user', function() {
  var app;
 
  before(function() {
    boot();
  });
 
  after(function() {
    shutdown();
  });

  it('should respond to GET',function(done){
    superagent
      .get('http://localhost:'+port+'mapi/template/nearmiss-tempalte1')
      .end(function(res){
        expect(res.status).to.equal(200);
        done();
    })
  })

});

