/* global describe */
/* global it */
'use strict';

var Twitter = require('../index');
var optional = require('optional');
var optConfig = {consumer_key: 'random', consumer_secret: 'random', token: 'random', token_secret: 'random'};
var config = optional('./config.json') || optConfig;
var should = require('should');

describe('Twitter.OAuth Functions:', function () {
  describe('OAuth loading', function () {
    it('should create the Object', function() {
      var oauth = new Twitter.OAuth(config);

      oauth.should.be.an.instanceOf(Object);
    });

    it('should throw an exception on missing params', function () {
      try {
        var oauth = new Twitter.OAuth({
          'consumer_key': config.consumer_key
        });
      } catch (err) {
        should.exist(err);
        should.not.exist(oauth);
      }
    });
  });

  describe('OAuth.proto.authenticate():', function () {
    it('should get an authenticate URL', function (done) {
      var oauth = new Twitter.OAuth(config);

      oauth.authenticate(config.token, function (err, response) {
        should.not.exist(err);

        should.exist(response);

        response.should.equal('https://api.twitter.com/oauth/authenticate?oauth_token=' + config.token);

        done();
      });
    });
  });

  describe('OAuth.proto.authorize():', function () {
    it('should get an authorize URL', function (done) {
      var oauth = new Twitter.OAuth(config);

      oauth.authorize(config.token, function (err, response) {
        should.not.exist(err);

        should.exist(response);

        response.should.equal('https://api.twitter.com/oauth/authorize?oauth_token=' + config.token);

        done();
      });
    });
  });

});
