'use strict';
// twitter-rest-lite
// =================
//
// A lightweight Twitter REST-API library with [OAuth](oauth.html)
// and basic `POST`/`GET` [API](api.html) requests modules.
//
// For more convenient methods you should check [`twitter-rest`](https://github.com/ghostbar/twitter-rest).
//

var API = require('./lib/api');
var OAuth = require('./lib/oauth');

//
// Quick Usage
// -----------
//
// ```
// var TwitterLib = require('twitter-rest-list'),
//     twitter = new TwitterLib({
//       consumer_key: "blahblahblah",
//       consumer_secret: "blahblahblah",
//       token: 'blah',
//       token_secret: 'blah',
//       callback: "randomurl"
//     });
//
// twitter.api.get('/statuses/user_timeline.json', {
//   screen_name: 'twitter',
//   count: 1
// }, function (err, response) {
//   if (err) throw err;
//
//   console.log(response);
// });
// ```
/// #### PLEASE BE WARNED
//
// Using the complete `require` is only recommended if `token` and 
// `token_secret` already exists.
//
// Otherwise the API module will throw an Error since it does need those 
// two variables to do any of the calls./
//
// What's available on the initialized object?
// -------------------------------------------
//
// Initializes two objects: `api` and `oauth`. You can initialize them
// separated too (this is my preferred method).
//
// Parameters to initialize any of the exported Objects
// ----------------------------------------------------
//
// All the exported functions expect an Object with the params:
//
// + `consumer_key` - (Required) consumer key given by Twitter
// + `consumer_secret` - (Required) consumer secret given by Twitter
// + `token` - (Optional) access_token key given by Twitter
// + `token_secret` - (Required if `access_token_key` was given) 
// given by Twitter
// + `callback` - (Optional) If your app is a desktop app write `oob` 
// (Out-Of-Band); if not then you should write your callback URL here 
// (which will rewrite the one configured on Twitter's developer dashboard.
// 

//
// Base URIs for Twitter API (These should be overwritten if to be used 
// with a compatible API)
//
var uri = {
  base: 'https://api.twitter.com/1.1',
  search: 'https://api.twitter.com/1.1/search'
};

//
// Usage
// -----
//
// ```
// var TwitterLib = require('twitter-rest-lite'),
//     keys = {consumer_key: '...', consumer_secret: '...', token: '...', token_secret: '...' callback: '...'},
//     twitter = new TwitterLib(keys);
//
// /* twitter.oauth object */
// twitter.oauth.requestToken( /* ... */ );
// twitter.oauth.accessToken( /* ... */ );
// twitter.oauth.authenticate( /* ... */ );
// twitter.oauth.authorize( /* ... */ );
//
// /* twitter.api object */
// twitter.api.get( /* ... */ );
// twitter.api.post( /* ... */ );
// ```
//
// #### PLEASE BE WARNED
//
// Using the complete `require` is only recommended if `token` and 
// `token_secret` already exists.
//
// Otherwise the API module will throw an Error since it does need those 
// two variables to do any of the calls.
//
// #### Code
module.exports = function(opts) {
  return {
    API: new API(uri, opts),
    OAuth: new OAuth(uri, opts)
  };
};

// OAuth Quick Usage
// -----------------
// 
// ```
// var TwitterLib = require('twitter-rest-lite'),
// toauth = new TwitterLib.OAuth({
//   consumer_key: 'blah',
//   consumer_secret: 'blah',
//   callback: 'randomurl'
// });
//
// toauth.requestToken(function (err, response) {
//   if (err)
//     throw err;
//
//   console.log(response);
// });
// ```
//
// More on the [OAuth module](oauth.html) documentation.
//
// #### Code
module.exports.OAuth = module.exports.oauth = function(opts) {
  return new OAuth(uri, opts);
};

// API Quick Usage
// ---------------
//
// ```
// var TwitterLib = require('twitter-rest-lite'),
// tapi = new TwitterLib.API({
//   consumer_key: 'blah',
//   consumer_secret: 'blah',
//   token: 'blah',
//   token_secret: 'blah',
//   callback: 'randomurl'
//  });
//
//  tapi.get('/statuses/user_timeline.json', {
//    screen_name: 'twitter'
//  }, function (err, response) {
//    if (err)
//      throw err;
//
//    console.log(response);
//  });
//  ```
//
//  More on the [API module](api.html) documentation.
//
// #### Code
module.exports.API = module.exports.api = function(opts) {
  return new API(uri, opts);
};

module.exports.helper = require('./lib/helper');
