var Twitter = require('../index');
var config = require('./config.json');
var should = require('should');

describe('Twitter.API Functions:', function() {
  describe('API loading', function() {
    it('should create the Object', function() {
      var api = new Twitter.API(config);

      api.should.be.an.instanceOf(Object);
    });
  });

  describe('API.get()', function() {
    it('should request an user timeline', function(done) {
      var api = new Twitter.API(config);

      api.get('/statuses/user_timeline.json', {screen_name: 'ghostbar', count: 1}, function(err, response) {
        should.not.exist(err);

        should.exist(response);

        done();
      });
    });
  });

  describe('API.post()', function() {
    it('should send a new tweet', function(done) {
      this.timeout(40000);

      var api = new Twitter.API(config);

      api.post('/statuses/update.json', {status: "This is a test 123."}, function(err, response) {
        should.not.exist(err);

        should.exist(response);

        done();
      });
    });
  });
});
