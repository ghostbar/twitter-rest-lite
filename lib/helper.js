'use strict';

var callError = module.exports.callError = function callError (errMsg, cb) {
  if (cb != null)
    return cb(new Error(errMsg));
  else
    throw new Error(errMsg);
};

module.exports.check = function check (obj, type, empty, errMsg, cb) {
  if (errMsg == null || typeof errMsg !== 'string' || errMsg === '') {
    callError('errMsg needs to be defined', cb);
    return true;
  }

  if (obj == null || typeof(obj) !== type) {
    callError(errMsg, cb);
    return true;
  }

  if (empty != null && obj === empty) {
    callError(errMsg, cb);
    return true;
  }
};

