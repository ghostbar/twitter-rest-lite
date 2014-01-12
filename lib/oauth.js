//
// Module: OAuth
// =============
//
// Abstraction for the authentication methods of Twitter's API.
//
// **Notice**: At the moment this is depending on `request`'s ability to create OAuth
// signatures, but in the future this should have it's own OAuth signing with
// OAuth2 support.
//
// Methods
// -------
//
// + [Constructor](#constructor)
// + [Request Token](#requestToken)
// + [Access Token](#accessToken)
// + [Authenticate](#authenticate)
// + [Authorize](#authorize)
//
// Usage
// -----
//
// ```
// var TwitterLib = require('twitter-rest-lite'),
// oauth = new TwitterLib.OAuth(var_with_keys);
//
// api.requestToken();
//
// api.accessToken();
//
// api.authenticate();
//
// api.authorize();
// ```
//
// #### Code
var OAuth,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = OAuth = (function() {

  //
  // <a name='constructor'></a>
  // Constructor
  // -----------
  //
  // #### Parameters
  //
  // + `uri`       - Object with the basic API URI's
  // + `opts`      - Object with the following params
  //   - `consumer_key` - [Required] consumer_key from Twitter
  //   - `consumer_secret` - [Required] consumer_secret from Twitter
  //   - `callback` - [Optional]
  //
  // #### Returns
  //
  // An `Object` with methods `requestToken`, `accessToken`, `authenticate`
  // and `authorize`.
  //
  // #### Code
  function OAuth(uri, opts) {
    this.uri = uri;

    /* Extending `uri` with oauth URI's */
    this.uri.request_token = 'https://api.twitter.com/oauth/request_token';
    this.uri.access_token = 'https://api.twitter.com/oauth/access_token';
    this.uri.authenticate = 'https://api.twitter.com/oauth/authenticate';
    this.uri.authorize = 'https://api.twitter.com/oauth/authorize';

    /* checking the required arguments */
    ['consumer_key', 'consumer_secret'].forEach(function (item, index) {
      if (opts[item] == null)
        throw new Error("There's a required argument missing: " + item);
    });

    this.opts = opts;

    /* bindings */
    this.requestToken = __bind(this.requestToken, this);
    this.accessToken = __bind(this.accessToken, this);
    this.authenticate = __bind(this.authenticate, this);
    this.authorize = __bind(this.authorize, this);
  };

  //
  // <a name='requestToken'></a>
  // Public: get a request token
  // ---------------------------
  //
  // #### Parameters
  //
  // + `callback`        - `Callback` Function
  //
  // #### Returns
  //
  // Returns a callback with an `Error Object` as first parameter if there was
  // (otherwise just `null`) and an `Object` with the response with the model:
  //
  // ```json
  // {
  //   token: String,
  //   token_secret: String,
  //   oauth_callback_confirmed: Boolean
  // }
  // ```
  //
  // #### Example
  //
  // ```js
  // oauth.requestToken(function (err, response) {
  //   if (err)
  //     throw err;
  //
  //   console.log(response);
  // });
  // ```
  //
  // `response.token` is used by [`oauth.authenticate`](#authenticate) and 
  // [`oauth.authorize`](#authorize).
  //
  // #### Code
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
   *  Public: get an access token
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
      token: token,
      verifier: verifier
    };

    request({
      method: 'POST',
      uri: self.uri.access_token,
      oauth: oauth
    }, function(err, response, body) {
      if (err)
        return callback(err);

      var qs = require('querystring');

      return callback(null, qs.parse(body));
    });

  };

  /**
   *  <a name='authenticate'></a>
   *  Public: get authenticate URL
   *  ----------------------------
   *
   *  token             - [Required] String with `oauth_token` from 
   *                      `OAuth.requestToken`.
   *  callback          - Callback Function
   *
   *  Returns a callback with an Error object as the first parameter and a string 
   *  with the URL to which redirect users as second parameter.
   **/
  OAuth.prototype.authenticate = function(token, callback) {
    var self = this;

    if ((token == null) || (typeof token !== 'string')) {
      return callback(new Error(
        'Error: Twitter:OAuth.authenticate requires a token as first argument.'
      ));
    }

    return callback(
      null,
      self.uri.authenticate + "?oauth_token=" + token
    );

  };

  /**
   *  <a name='authorize'></a>
   *  Public: get authorize URL
   *  -------------------------
   *
   *  token             - [Required] String with `oauth_token` from 
   *                      `OAuth.requestToken`.
   *  callback          - Callback Function
   *
   *  Returns a callback with an Error object as the first parameter and a string
   *  with the URL to which redirect users as second parameter.
   **/
  OAuth.prototype.authorize = function(token, callback) {
    var self = this;

    if ((token == null) || (typeof token !== 'string')) {
      return callback(new Error(
        'Error: Twitter:OAuth.authorize requires a token as first argument.'
      ));
    }

    return callback(
      null,
      self.uri.authorize + "?oauth_token=" + token
    );
  };

  return OAuth;
})();
