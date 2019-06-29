var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');

// login user api test
describe('POST Login Test /login', function() {
  it('Ok, login user api', function(done) {
    request(app).post('/login/testlogin')
      .send({ email: 'test@test.com', password: 'test123'})
      .then(function(res){
        var body = res.body.login;
        expect(body).to.equal(true);
        done();
      })
      .catch(function(error) {
        done(error);
      });
  });
});

