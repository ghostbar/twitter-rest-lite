'use strict';

//
// Module: API
// ===========
//
// Abstraction for the basic `GET`/`POST` operations of Twitter's REST API.
//
// Methods
// -------
// 
// + [Constructor/Initialize](#constructor)
// + [GET](#get)
// + [POST](#post)
//
// Usage
// -----
//
// ```
// var TwitterLib = require('twitter-rest-lite'),
// api = new TwitterLib.API(var_with_keys);
//
// api.get(url, params, callback);
//
// api.post(url, data, callback);
// ```
//
// <a name='constructor'></a>
// Constructor
// -----------
//
// #### Parameters
//
// + `uri`           - base URI's to use (this should be provided by the
// library itself)
// + `opts`          - `Object` with user-provided params
//   - `consumer_key` - required
//   - `consumer_secret` - required
//   - `token` - required
//   - `token_secret` - required
//
// #### Returns
//
// An `Object` with methods `get` and `post`.
//
// #### Code
function API(uri, opts) {
  this.uri = uri;

  /* checking the required arguments */
  [
    'consumer_key',
    'consumer_secret',
    'token',
    'token_secret'
  ].forEach(function (item) {
    if (opts[item] == null)
      throw new Error('There\'s a required argument missing: ' + item);
  });

  this.opts = opts;
}

//
// <a name='get'></a>
// Public: Abstract GET request to the API
// ---------------------------------------
//
// #### Parameters
//
// + `url`             - String
// + `params`          - [Optional] Object with params to be passed
// + `callback`        - Callback Function
//
// #### Returns
//
// A `Callback` with two parameters. First is an `Error Object` and second
// the body of the response in an `Object`.
//
// #### Example
//
// ```js
// api.get('/statuses/user_timeline.json', {
//   screen_name: 'random',
//   count: 1
// }, function (err, response) {
//   if (err)
//     throw err;
//
//   console.log(response);
// });
// ```
// #### Code
API.prototype.get = function(url, params, callback) {
  var self = this;
  var request = require('request');
  var helper = require('./helper');

  helper.check(url, 'string', '', 'Missing URL parameter', callback);

  url = self.uri.base + url;

  if ((params != null) && (typeof params === 'object')) {
    var qs = require('querystring');
    url += '?' + qs.stringify(params);
  }

  request({
    method: 'GET',
    uri: url,
    oauth: self.opts,
    json: true,
  }, function (err, response, body) {
    return callback(err, body);
  });
};

//
// <a name='post'></a>
// Public: abstract POST request to the API
// ----------------------------------------
//
// #### Parameters
//
// + `url`             - String
// + `data`            - [Required] Object with data
// + `callback`        - Callback Function
//
// #### Returns
//
// A `Callback` with two parameters: `Error Object` and `Object` with
// body response from Twitter's API server.
//
// #### Example
//
// ```js
// api.post('/statuses/update.json', {
//   status: "This is an update to twitter!"
// }, function (err, response) {
//   if (err)
//     throw err;
//
//   console.log(response);
// });
// ```
//
// #### Code
API.prototype.post = function(url, data, callback) {
  var self = this;
  var request = require('request');
  var helper = require('./helper');

  if (helper.check(url, 'string', '', 'Missing URL parameter', callback))
    return;

  if (helper.check(data, 'object', {}, 'Missing data parameter', callback))
    return;

  request({
    method: 'POST',
    uri: self.uri.base +  url,
    oauth: self.opts,
    form: data
  }, function (err, response, body) {
    return callback(err, body);
  });
};


module.exports = API;
