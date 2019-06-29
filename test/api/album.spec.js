var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');


// Album api test
describe('GET Albums', function() {
  it('OK, Get albums data done!', function(done) {
    request(app).get('/albumtest/test')
      .then(function(res) {
        var body = res.body[0];
        expect(body).to.contain.property('userId');
        expect(body).to.contain.property('id');
        expect(body).to.contain.property('title');
        done();
      })
      .catch(function(error) {
        done(error);
      });
  });
});