/* global describe */
/* global it */
'use strict';

var Twitter = require('../index');
var config = require('./config.json');
var should = require('should');

describe('Twitter.API Module Network Functions:', function () {
  describe('API.get()', function () {
    it('should request an user timeline', function (done) {
      var api = new Twitter.API(config);
      var vars = {
        screen_name: 'ghostbar',
        count: 1
      };

      api.get('/statuses/user_timeline.json', vars, function (err, response) {
        should.not.exist(err);

        should.exist(response);

        done();
      });
    });
  });

  describe('API.post()', function () {
    it('should send a new tweet', function (done) {
      this.timeout(40000);

      var api = new Twitter.API(config);
      var data = {
        status: 'This is a test 123.'
      };

      api.post('/statuses/update.json', data, function (err, response) {
        should.not.exist(err);

        should.exist(response);

        done();
      });
    });
  });

});
