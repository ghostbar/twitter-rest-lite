var API = require('./lib/api'),
    OAuth = require('./lib/oauth'),
    uri = {
      base: 'https://api.twitter.com/1.1',
      search: 'https://api.twitter.com/1.1/search'
    };

/**
 *  Main
 *  ====
 *
 *  All the exported functions expect an Object with the params:
 *
 *  consumer_key          - [Required]
 *  consumer_secret       - [Required]
 *  access_token_key      - [Optional]
 *  access_token_secret   - [Optional, but required if `access_token_key` was given]
 *  callback              - [Optional]
 *
 *  The main will export all the functions implemented.
 **/
module.exports = function(opts) {
  return {
    api: new API(uri, opts),
    oauth: new OAuth(uri, opts)
  }
};

module.exports.oauth = function(opts) {
  return new OAuth(uri, opts);
};

module.exports.api = function(opts) {
  return new API(uri, opts);
};
