twitter-rest-lite [![Build Status](https://secure.travis-ci.org/ghostbar/twitter-rest-lite.png)](http://travis-ci.org/ghostbar/twitter-rest-lite)
=================

A lite Twitter's API library for Node.js. It has two interfaces: a simple API interface for interacting via `GET` and `POST` requests with Twitter's API and an OAuth interface that takes care of authentication related stuff with Twitter's API.

API Interface
-------------

### Brief

    var tlite = require('twitter-rest-lite');
    var twitter = new tlite.API(variableWithDevTwitterKeys);
    // You could use new tlite(keys) too but you would need to access to object in the form
    // 'twitter.api.get' instead of 'twitter.get'.

    twitter.get(url, params, callback);
    twitter.post(url, data, callback);

### API Initialization

The constructor expects to receive the keys in a JSON that will be used to interact with the API, this includes `consumer_key`, `consumer_secret`, `token` and `token_secret`. The last two can be found as well in the developers website of Twitter for doing requests with the app's credentials.

### API.get

The `get` method expects to receive an URL for the API as first parameter, then the parameters that the URL accepts in a JSON and a callback as third parameters with the regular «Error first, response after».

This is an example of how it would look with a call to URL [`https://api.twitter.com/1.1/statuses/mentions_timeline.json`](https://dev.twitter.com/docs/api/1.1/get/statuses/mentions_timeline):

    twitter.get('/statuses/mentions_timeline.json', {
      count: 100
    }, function (err, response) {
      // do whatever you want
    });

### API.post

The `post` method expects to receive an URL for the API as first parameter, then the data (at the moment only JSON) to be sent and a callback as third paramenter with the regular «Error first, response after».

This is an example of how it would look with a call to the URL [`https://api.twitter.com/1.1/statuses/update.json`](https://dev.twitter.com/docs/api/1.1/post/statuses/update):

    twitter.post('/statuses/update.json', {
      status: 'I\'m tweeting!'
    }, function (err, response) {
      // do whatever you want
    });

Testing
-------

In order to get full testing done (with `gulp test-all`), first create the file `test/config.json` with the following format:

    {
      "consumer_key": "Your credential from Twitter's Developer Interface",
      "consumer_secret": "Your credential from Twitter's Developer Interface",
      "token": "Your credential from Twitter's Developer Interface",
      "token_secret": "Your credential from Twitter's Developer Interface",
      "callback": "Either your callback or 'oob' if is a desktop app"
    }

Now run:

    gulp test-all

Known Issues
------------

- There's no testing unit for `OAuth.proto.accessToken` but the example uses it.

Using
-----

    var tlite = require('twitter-rest-lite');

    var keys = { consumer_key: 'blahblahblah', consumer_secret: 'blahblahblah', callback: '...' };

    var tt = new Twitter(keys);

    // Just Twitter's OAuth REST interface
    var TwitterOAuth = new Twitter.OAuth(keys);

    // Using API module required 'token' and 'token_secret' on 'keys'.
    keys['token'] = '...';
    keys['token_secret'] = '...';

    // Just Twitter's basic GET/POST interface
    var twitter = new Twitter.API(keys);

    twitter.get('/statuses/mentions_timeline.json', params, function(err, response) {
      ...
    });


Documentation
-------------

[http://ghostbar.github.io/twitter-rest-lite](http://ghostbar.github.io/twitter-rest-lite) and/or
`docs/` and/or the code itself. It's the same documentation.

License and author
------------------

© 2013-2014, Jose Luis Rivas `<me@ghostbar.co>`. 

Licensed under the MIT terms. A copy of the license is on the file `LICENSE`.
