var API,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

/**
 *  Module: API
 *  ===========
 *
 *  Abstraction for the basic GET/POST operations.
 **/
module.exports = API = (function() {

  /**
   *  <a name='constructor'></a>
   *  Constructor
   *  -----------
   **/
  function API(uri, opts) {
    this.uri = uri;
    this.opts = opts;

    // bindings
    this.get = __bind(this.get, this);
    this.post = __bind(this.post, this);
  };

  /**
   *  <a name='get'></a>
   *  Public: Abstract GET request to the API
   *  ---------------------------------------
   *
   *  url             - String
   *  params          - [Optional] Object with params to be passed
   *  callback        - Callback Function
   **/
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

  /**
   *  <a name='post'></a>
   *  Public: abstract POST request to the API
   *  ----------------------------------------
   *
   *  url             - String
   *  data            - [Required] Object with data
   *  callback        - Callback Function
   **/
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
      body: JSON.stringify(data)
    }, function (err, response, body) {
      if (err)
        return callback(err);
    });
  };

  return API;
})();
