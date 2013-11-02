var Twitter = require('../index'),
    config = require('./config.json'),
    should = require('should');

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

      api.get('/statuses/user_timeline.json', {screen_name: 'ghostbar'}, function(err, response) {
        should.not.exist(err);

        should.exist(response);

        done();
      });
    });
  });

  describe('API.post()', function() {
    it('should be implemented, not yet', function() {
      console.log('TODO: TO BE IMPLEMENTED!');
    });
  });
});
