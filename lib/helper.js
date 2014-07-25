'use strict';

var callError = module.exports.callError = function callError (errMsg, cb) {
  if (cb != null)
    return cb(new Error(errMsg));
  else
    throw new Error(errMsg);
};

module.exports.check = function check (obj, type, empty, errMsg, cb) {
  if (errMsg == null || typeof errMsg !== 'string' || errMsg === '')
    return callError('errMsg needs to be defined', cb);

  if (obj == null || typeof(obj) !== type)
    return callError(errMsg, cb);

  if (empty != null && obj === empty)
    return callError(errMsg, cb);
};

