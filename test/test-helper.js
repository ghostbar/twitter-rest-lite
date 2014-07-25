/* global describe,it */
'use strict';

var should = require('should');

describe('Helper functions', function () {
  var h = require('../lib/helper');

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
  });

});
