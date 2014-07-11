twitter-rest-lite [![Build Status](https://secure.travis-ci.org/ghostbar/twitter-rest-lite.png)](http://travis-ci.org/ghostbar/twitter-rest-lite)
=================

[![NPM](https://nodei.co/npm/twitter-rest-lite.png?stars&downloads)](https://nodei.co/npm/twitter-rest-lite/)

[![NPM](https://nodei.co/npm-dl/twitter-rest-lite.png)](https://nodei.co/npm/twitter-rest-lite/)

Yet another Twitter's API library for Node.js, yes. 

Testing
-------

In order to get full testing done (with `make test-all`), first create the file `test/config.json` with the following format:

```js
{
  "consumer_key": "Your credential from Twitter's Developer Interface",
  "consumer_secret": "Your credential from Twitter's Developer Interface",
  "token": "Your credential from Twitter's Developer Interface",
  "token_secret": "Your credential from Twitter's Developer Interface",
  "callback": "Either your callback or `oob` if is a desktop app"
}
```

Now run:

    make test-all

Known Issues
------------

- There's no testing unit for `OAuth.proto.accessToken` but the example uses it.

Using
-----

```js
var Twitter = require('twitter-rest-lite'),
    keys,
    tt, ttoauth, ttapi;

keys = { consumer_key: 'blahblahblah', consumer_secret: 'blahblahblah', callback: '...' };

tt = new Twitter(keys);

// Just Twitter's OAuth REST interface
ttoauth = new Twitter.OAuth(keys);

// Using API module required `token` and `token_secret` on `keys`.
keys['token'] = '...';
keys['token_secret'] = '...';

// Just Twitter's basic GET/POST interface
ttapi = new Twitter.API(keys);

ttapi.get('/statuses/mentions_timeline.json', params, function(err, response) {
  ...
});

```

Documentation
-------------

[http://ghostbar.github.io/twitter-rest-lite](http://ghostbar.github.io/twitter-rest-lite) and/or
`docs/` and/or the code itself. It's the same documentation.

License and author
------------------
© 2013-2014, Jose Luis Rivas `<me@ghostbar.co>`. Licensed under the MIT terms. A copy of the license is on the file `LICENSE`.
