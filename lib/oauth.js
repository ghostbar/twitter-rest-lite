var OAuth,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

/**
 *  Module: OAuth
 *  =============
 *
 *  Abstraction for the authentication
 *
 *  At the moment this is depending on `request`'s ability to create OAuth
 *  signatures, but in the future this should have it's own OAuth signing with
 *  OAuth2 support.
 **/
module.exports = OAuth = (function() {

  /**
   *  <a name='constructor'></a>
   *  Constructor
   *  -----------
   *
   *  uri       - Object with the basic API URI's
   *  opts      - Object with the following params
   *  + consumer_key: [Required] consumer_key from Twitter
   *  + consumer_secret: [Required] consumer_secret from Twitter
   *  + callback: [Optional]
   **/
  function OAuth(uri, opts) {
    this.uri = uri;

    // Extending `uri` with oauth URI's
    this.uri.request_token = 'https://api.twitter.com/oauth/request_token';
    this.uri.access_token = 'https://api.twitter.com/oauth/access_token';
    this.uri.authenticate = 'https://api.twitter.com/oauth/authenticate';
    this.uri.authorize = 'https://api.twitter.com/oauth/authorize';

    // checking the required arguments
    ['consumer_key', 'consumer_secret'].forEach(function (item, index) {
      if (opts[item] == null)
        throw new Error("There's a required argument missing: " + item);
    });

    this.opts = opts;

    // bindings
    this.requestToken = __bind(this.requestToken, this);
    this.accessToken = __bind(this.accessToken, this);
    this.authenticate = __bind(this.authenticate, this);
    this.authorize = __bind(this.authorize, this);
  };

  /**
   *  <a name='requestToken'></a>
   *  Public: get a request token
   *  ---------------------------
   *
   *  callback        - Callback Function
   *
   *  Returns a callback with an Error Object as first parameter if there was
   *  (otherwise just `null`) and an Object with the response with the model:
   *
   *  ```js
   *  {
   *    oauth_token: String,
   *    oauth_token_secret: String,
   *    oauth_callback_confirmed: Boolena
   *  }
   *  ```
   **/
  OAuth.prototype.requestToken = function(callback) {
    var self = this,
        request = require('request'),
        oauth = {
          consumer_key: self.opts.consumer_key,
          consumer_secret: self.opts.consumer_secret
        };

    if (self.opts.callback != null) {
      oauth['callback'] = self.opts.callback;
    }

    request({
      method: 'POST',
      uri: self.uri.request_token,
      oauth: oauth
    }, function (err, response, body) {
      if (err)
        return callback(err);

      if (response.statusCode != 200) {
        return callback(new Error(
          'Twitter:OAuth.requestToken received an status differente than 200: \n' +
          'Status Code: ' + response.statusCode + '\n' +
          'Body: \n' + body
        ));
      }

      var qs = require('querystring');

      return callback(null, qs.parse(body));

    });
  };

  /**
   *  <a name='accessToken'></a>
   *  TODO: Public: get an access token
   *  ---------------------------
   *
   *  token           - String with `oauth_token`
   *  verifier        - String with `oauth_verifier`
   *  callback        - Callback Function
   *
   *  Returns a callback with an Error object as first parameter if there was
   *  (otherwise just `null`) and an Object with the response with the model:
   *
   *  ```js
   *  {
   *    oauth_token: String,
   *    oauth_ FIXME
   *  }
   *  ```
   **/
  OAuth.prototype.accessToken = function(token, verifier, callback) {
    var self = this,
        request = require('request');

    [token, verifier].forEach(function (item) {
      if (item == null) {
        return callback(new Error(
          'Twitter:OAuth.accessToken requires all the arguments to work.'
        ));
      }
    });
    
    var oauth = {
      consumer_key: self.opts.consumer_key,
      consumer_secret: self.opts.consumer_secret,
      oauth_token: token,
      oauth_verifier: verifier
    };

    request({
      method: 'POST',
      uri: self.uri.access_token,
      oauth: oauth
    }, function(err, response, body) {
      if (err)
        return callback(err);

      // TODO: what status receives?
      // TODO: Should throw a new Error if the status is not right
      var qs = require('querystring');

      return callback(null, qs.parse(body));  // TODO: What exactly is returning? 
                                              // Document it.

    });

  };

  /**
   *  <a name='authenticate'></a>
   *  Public: get authenticate URL
   *  ----------------------------
   *
   *  params            - Object with:
   *  + token: [Required] String with `oauth_token` from `OAuth.requestToken`
   *  callback          - Callback Function
   *
   *  Returns a callback with an Error object as the first parameter and a string 
   *  with the URL to which redirect users as second parameter.
   **/
  OAuth.prototype.authenticate = function(params, callback) {
    var self = this;

    if ((params.token == null) || (typeof params.token !== 'string')) {
      return callback(new Error(
        'Error: Twitter:OAuth.authenticate requires a token as first argument.'
      ));
    }

    return callback(
      null,
      self.uri.authenticate + "?oauth_token=" + params.token
    );

  };

  /**
   *  <a name='authorize'></a>
   *  Public: get authorize URL
   *  -------------------------
   *
   *  params            - Object with
   *  + token: [Required] String with `oauth_token` from `OAuth.requestToken`
   *  callback          - Callback Function
   *
   *  Returns a callback with an Error object as the first parameter and a string
   *  with the URL to which redirect users as second parameter.
   **/
  OAuth.prototype.authorize = function(params, callback) {
    var self = this;

    if ((params.token == null) || (typeof params.token !== 'string')) {
      return callback(new Error(
        'Error: Twitter:OAuth.authorize requires a token as first argument.'
      ));
    }

    return callback(
      null,
      self.uri.authorize + "?oauth_token=" + params.token
    );
  };

  return OAuth;
})();
