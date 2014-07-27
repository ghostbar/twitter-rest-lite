'use strict';
var helper = require('./helper');

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
// api.requestToken(callback);
//
// api.accessToken(token, verifier, callback);
//
// api.authenticate(callback);
//
// api.authorize(callback);
// ```
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
  this.uri.requestToken = 'https://api.twitter.com/oauth/request_token';
  this.uri.accessToken = 'https://api.twitter.com/oauth/access_token';
  this.uri.authenticate = 'https://api.twitter.com/oauth/authenticate';
  this.uri.authorize = 'https://api.twitter.com/oauth/authorize';

  /* checking the required arguments */
  ['consumer_key', 'consumer_secret'].forEach(function (item) {
    if (opts[item] == null)
      throw new Error('There\'s a required argument missing: ' + item);
  });

  this.opts = opts;
}

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
  var self = this;
  var request = require('request');
  var oauth = {};
  
  ['consumer_key', 'consumer_secret', 'callback'].forEach(function (e) {
    if (self.opts[e] != null)
      oauth[e] = self.opts[e];
  });

  request({
    method: 'POST',
    uri: self.uri.requestToken,
    oauth: oauth
  }, function (err, response, body) {
    if (err)
      return callback(err);

    if (response.statusCode !== 200) {
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

//
// <a name='accessToken'></a>
// Public: get an access token
// ---------------------------
//
// #### Parameters
//
// + `token`           - `String` with `oauth_token`
// + `verifier`        - `String` with `oauth_verifier`
// + `callback`        - `Callback` Function
//
// #### Returns
//
// A `Callback` with an `Error` object as first parameter if there was
// (otherwise just `null`) and an `Object` with the response with the model:
//
// ```js
// {
//   oauth_token: String,
//   oauth_token_secret: String,
//   user_id: String,
//   screen_name: String
// }
// ```
//
// #### Example
//
// After running either `oauth.authenticate` or `oauth.authorize` and
// making the proper request to twitter's servers you will end up with
// a `token` and a `verifier`. Suppose they are stored each in a variable
// of the same name, then:
// 
// ```
// oauth.accessToken(token, verifier, function (err, response) {
//   if (err)
//     throw (err);
//
//   console.log(response);
// });
// ```
//
// With the data from that response you can initialize the API module and
// start `GET`'ing and `POST`'ing with *user context* as Twitter calls it.
//
// #### Code
OAuth.prototype.accessToken = function(token, verifier, callback) {
  var self = this;
  var request = require('request');

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
    uri: self.uri.accessToken,
    oauth: oauth
  }, function(err, response, body) {
    if (err)
      return callback(err);

    var qs = require('querystring');

    return callback(null, qs.parse(body));
  });

};

//
// <a name='authenticate'></a>
// Public: get authenticate URL
// ----------------------------
//
// #### Parameters
//
// + `token`             - [Required] `String` with `oauth_token` from 
// `OAuth.requestToken`.
// + `cb`          - `Callback` Function
//
// #### Returns
//
// A `Callback` with an `Error` object as the first parameter and a `String` 
// with the URL to which redirect users as second parameter.
//
// #### Example
//
// ```js
// oauth.authenticate(token, function (err, response) {
//   if (err)
//     throw err;
//
//   console.log(response);
//   /* https://api.twitter.com/oauth/authenticate?oauth_token= + token provided */
// });
// ```
//
// #### Code
OAuth.prototype.authenticate = function(token, cb) {
  helper.authyThing.call(this, 'authenticate', token, cb);
};

//
// <a name='authorize'></a>
// Public: get authorize URL
// -------------------------
//
// #### Parameters
//
// + `token`             - [Required] `String` with `oauth_token` from 
// `OAuth.requestToken`.
// + `cb`          - `Callback` Function
//
// #### Returns
//
// A `Callback` with an `Error` object as the first parameter and a `String`
// with the URL to which redirect users as second parameter.
//
// #### Example
//
// ```js
// oauth.authorize(token, function (err, response) {
//   if (err)
//     throw err;
//
//   console.log(response);
//   /* https://api.twitter.com/oauth/authorize?oauth_token= + token provided */
// });
// ```
// #### Code
OAuth.prototype.authorize = function(token, cb) {
  helper.authyThing.call(this, 'authorize', token, cb);
};

module.exports = OAuth;
