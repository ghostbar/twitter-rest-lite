/* global describe,it */
'use strict';

var should = require('should');

describe('Helper functions', function () {
  var h = require('../lib/helper');

  describe('loading via index file', function () {
    var a = require('../index').helper;

    it('should exist the functions', function () {
      should.exist(a);
      (typeof(a.callError)).should.equal('function');
    });
  });

  describe('callError():', function () {
    it('should exist and be a function', function () {
      should.exist(h.callError);
      (typeof(h.callError)).should.equal('function');
    });

    it('should send error via Callback if callback exists', function (done) {
      h.callError('Throw', function (err) {
        should.exist(err);
        done();
      });
    });
  });

  describe('check():', function () {
    it('should exist and be a function', function () {
      should.exist(h.check);
      (typeof(h.check)).should.equal('function');
    });

    it('should send an error if obj does not exist (callback)', function (done) {
      h.check(null, 'string', '', 'Should send an error', function (err) {
        should.exist(err);
        done();
      });
    });

    it('should throw an exception if obj does not exist (no-callback)', function () {
      try {
        h.check(null, 'string', '', 'Should throw exception', null);
      } catch (err) {
        should.exist(err);
      }
    });

    it('should throw an error if errMsg is empty', function (done) {
      h.check(null, 'string', '', '', function (err) {
        should.exist(err);
        done();
      });
    });

    it('on errors it should return true', function (done) {
      function cb (err) {
        should.exist(err);
      }
      if (h.check('', 'string', '', 'Send error', cb))
        done();
    });

    it('should pass clean if obj exists', function () {
      try {
        h.check('test', 'string', '', 'Dont send error');
      } catch (err) {
        should.not.exist(err);
      }
    });

    it('should evaluate even if empty is not defined', function () {
      try {
        h.check('test', 'string', null, 'Dont send error');
      } catch (err) {
        should.not.exist(err);
      }
    });

  });

  describe('authyThing', function () {
    it('should exist and be a function', function () {
      should.exist(h.authyThing);
      (typeof(h.authyThing)).should.equal('function');
    });

    it('should print a token url', function (done) {
      var a = {
        uri: {
          anything: 'random'
        }
      };

      h.authyThing.call(a, 'anything', 'token', function (err, res) {
        should.not.exist(err);
        should.exist(res);

        res.should.equal('random?oauth_token=token');

        done();
      });
    });
  });

});
