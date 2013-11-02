twitter-rest-lite
=================

Yet another Twitter's API library for Node.js, yes. 

Testing
-------

In order to get testing done, first create the file `test/config.json` with the following format:

```js
{
  "consumer_key": "Your credential from Twitter's Developer Interface",
  "consumer_secret": "Your credential from Twitter's Developer Interface",
  "access_token": "Your credential from Twitter's Developer Interface",
  "access_token_secret": "Your credential from Twitter's Developer Interface",
  "callback": "oob"
}
```

Now run:

    make test

Known Issues
------------

- There's no testing for `api.proto.post()` and `oauth.proto.accessToken()`.

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

keys['access_token'] = '...';
keys['access_token_secret'] = '...';

// Just Twitter's basic GET/POST interface
ttapi = new Twitter.API(keys);

```

License and author
------------------
© 2013, Jose Luis Rivas `<me@ghostbar.co>`. Licensed under the MIT terms. A copy of the license is on the file `LICENSE`.
