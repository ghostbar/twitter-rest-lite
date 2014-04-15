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
  });
});
