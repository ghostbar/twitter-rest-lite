/* global describe */
/* global it */
'use strict';

var Twitter = require('../index');
var config = require('./config.json');
var should = require('should');

describe('Twitter.OAuth Module Network Function:', function () {
  describe('OAuth.proto.requestToken():', function () {
    it('should request a token', function (done) {
      var oauth = new Twitter.OAuth(config);

      oauth.requestToken(function (err, response) {
        should.not.exist(err);

        should.exist(response);

        response.should.be.an.instanceOf(Object);

        done();
      });
    });
  });

  describe('OAuth.proto.accessToken():', function () {
    it('should request an access_token', function (done) {
      console.log('\n TODO: This requires a previous step with human intervention, not yet implemented');

      done();
    });
  });

});
