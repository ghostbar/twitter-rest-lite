var Twitter = require('../index'),
    config = require('./config.json'),
    should = require('should');

describe('Twitter.OAuth Functions:', function() {
  describe('OAuth loading', function() {
    it('should create the Object', function() {
      var oauth = new Twitter.OAuth(config);

      oauth.should.be.an.instanceOf(Object);
    });
  });

  describe('OAuth.proto.requestToken():', function() {
    it('should request a token', function(done) {
      var oauth = new Twitter.OAuth(config);

      oauth.requestToken(function(err, response) {
        should.not.exist(err);

        should.exist(response);

        response.should.be.an.instanceOf(Object);

        done();
      });
    });
  });

  describe('OAuth.proto.accessToken():', function() {
    it('should request an access_token', function(done) {
      console.log('\nTODO: NEEDS TO BE IMPLEMENTED!');
      done();
    });
  });

  describe('OAuth.proto.authenticate():', function() {
    it('should get an authenticate URL', function(done) {
      var oauth = new Twitter.OAuth(config);

      oauth.authenticate(config.token, function(err, response) {
        should.not.exist(err);

        should.exist(response);

        response.should.equal("https://api.twitter.com/oauth/authenticate?oauth_token=" + config.token);

        done();
      });
    });
  });

  describe('OAuth.proto.authorize():', function() {
    it('should get an authorize URL', function(done) {
      var oauth = new Twitter.OAuth(config);

      oauth.authorize(config.token, function(err, response) {
        should.not.exist(err);

        should.exist(response);

        response.should.equal("https://api.twitter.com/oauth/authorize?oauth_token=" + config.token);

        done();
      });
    });
  });

});
