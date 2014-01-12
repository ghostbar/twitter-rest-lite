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
// ```
// var TwitterLib = require('twitter-rest-lite'),
// api = new TwitterLib.API(var_with_keys);
//
// api.get(url, params, callback);
//
// api.post(url, data, callback);
// ```

var API,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = API = (function() {

  //
  // <a name='constructor'></a>
  // Constructor
  // -----------
  //
  // #### Parameters
  //
  // + `uri`           - base URI's to use (this should be provided by the
  // library itself)
  // + `opts`          - external options provided by the user. API requires
  // `token` and `token_secret` to be given.
  //
  // #### Returns
  //
  // An `Object` with methods `get` and `post`.
  //
  // #### Code
  function API(uri, opts) {
    this.uri = uri;
    this.opts = opts;

    /* bindings */
    this.get = __bind(this.get, this);
    this.post = __bind(this.post, this);
  };

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
    var self = this,
        request = require('request');

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
      if (err)
        return callback(err);

      return callback(null, body);
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
    var self = this,
        request = require('request'),
        body = null;

    url = self.uri.base + url;

    if (data != null)
      body = JSON.stringify(data);

    request({
      method: 'POST',
      uri: url,
      oauth: self.opts,
      form: data
    }, function (err, response, body) {
      if (err)
        return callback(err);

      return callback(null, body);
    });
  };

  return API;
})();
