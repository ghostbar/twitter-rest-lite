/* global describe */
/* global it */
'use strict';

var Twitter = require('../index');
var optional = require('optional');
var optConfig = {consumer_key: 'random', consumer_secret: 'random', token: 'random', token_secret: 'random'};
var config = optional('./config.json') || optConfig;
var should = require('should');

describe('Twitter.API Functions:', function() {
  describe('API loading', function() {
    it('should create the Object', function() {
      var api = new Twitter.API(config);

      should.exist(api.get);

      should.exist(api.post);

      api.should.be.an.instanceOf(Object);
    });

    it('should throw an exception on missing arguments', function () {
      try {
        var api = new Twitter.API({
          'consumer_key': config.consumer_key
        });
      } catch (err) {
        should.exist(err);
        should.not.exist(api);
      }
    });
  });

  describe('API.proto.get()', function () {
    it('should send an error if fails to get an URL (callback)', function (done) {
      var api = new Twitter.API(config);

      api.get([], null, function (err) {
        should.exist(err);
        done();
      });
    });
  });

});
