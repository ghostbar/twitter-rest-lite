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
    var api = new Twitter.API(config);

    it('should send an error if fails to get an URL (callback)', function (done) {
      api.get([], null, function (err) {
        should.exist(err);
        done();
      });
    });

    it('should send an error if fails to get an URL (no-callback)', function () {
      try {
        api.get('');
      } catch (err) {
        should.exist(err);
      }
    });
  });

  describe('API.proto.post()', function () {
    var api = new Twitter.API(config);

    it('should send an error if fails to get an URL (callback)', function (done) {
      api.post([], null, function (err) {
        should.exist(err);
        done();
      });
    });

    it('should send an error if fails to get an URL (no-callback)', function () {
      try {
        api.post('');
      } catch (err) {
        should.exist(err);
      }
    });

    it('should send an error if fails to get data (callback)', function (done) {
      api.post('url.json', null, function (err) {
        should.exist(err);
        done();
      });
    });

    it('should send an error if fails to get data (no-callback)', function () {
      try {
        api.post('url.json');
      } catch (err) {
        should.exist(err);
      }
    });

  });
});
