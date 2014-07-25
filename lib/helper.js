'use strict';

module.exports.check = function check (obj, type, empty, cb, errMsg) {
  if (obj == null || obj === empty || typeof(obj) !== type) {
    if (cb != null)
      return cb(new Error(errMsg));
    else
      throw new Error(errMsg);
  }
};
