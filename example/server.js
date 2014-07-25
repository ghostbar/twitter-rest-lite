'use strict';

var express = require('express');
var app = express();
var token = {};

function gotAccess (res, err, response) {
  console.log(response);
  res.send(response);
}

app.get('/', function(req, res) {
  res.send('<a href=\'/auth/twitter\'>Sign In with Twitter</a><br>' +
          '<a href=\'/apps/twitter\'>Authorize with Twitter</a>');
});

app.get('/auth/twitter', function(req, res) {
  var Twitter = require('./../index'),
      config = require('./config.json'),
      oauth;

  config['callback'] = 'http://localhost:9999/twitter/authenticate';

  oauth = new Twitter.OAuth(config);
  oauth.requestToken(requestToken);

  function requestToken(err, response) {
    token['token'] = response.oauth_token;
    token['token_secret'] = response.oauth_token_secret;
    oauth.authenticate(token.token, authenticate);
  }

  function authenticate(err, response) {
    console.log(response);
    res.redirect(response);
  }
});

app.get('/apps/twitter', function(req, res) {
  var Twitter= require('./../index');
  var config = require('./config.json');
  var oauth;

  config.callback = 'http://localhost:9999/twitter/authorize';

  oauth = new Twitter.OAuth(config);
  oauth.requestToken(requestToken);

  function requestToken(err, response) {
    token['token'] = response.oauth_token;
    token['token_secret'] = response.oauth_token_secret;
    oauth.authorize(token.token, authenticate);
  }

  function authenticate(err, response) {
    console.log(response);
    res.redirect(response);
  }
});

app.get('/twitter/authenticate', function(req, res) {
  if(req.query.oauth_token !== token.token) {
    console.log(req.query.oauth_token);
    console.log(token.token);
    var err =  new Error('Token is not the same!');
    res.send(err);
    throw err;
    return;
  }

  console.log('token ' + req.query.oauth_token);
  console.log('verifier ' + req.query.oauth_verifier);

  var Twitter = require('./../index');
  var config = require('./config.json');
  var oauth = new Twitter.OAuth(config);
  
  oauth.accessToken(req.query.oauth_token, req.query.oauth_verifier, gotAccess.bind(this, res));

});

app.get('/twitter/authorize', function(req, res) {
  if (req.query.oauth_token !== token.token) {
    console.log(req.query.oauth_token);
    console.log(token.token);
    var err = new Error('Token is not the same!');
    res.send(err);
    throw err;
  }

  console.log('token ' + req.query.oauth_token);
  console.log('verifier ' + req.query.oauth_verifier);

  var Twitter = require('./../index');
  var config = require('./config.json');
  var oauth = new Twitter.OAuth(config);

  oauth.accessToken(req.query.oauth_token, req.query.oauth_verifier, gotAccess.bind(this, res));
});

app.listen(9999);
console.log('Listening on port 9999');
