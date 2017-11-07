'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((cid, callback) => {
    if (typeof cid == 'function') {
      callback = cid
      cid = undefined
    }

    var lsPath = 'allocations';
    if (cid) {
      lsPath += '/' + cid
    }

    send({
      path: lsPath
    }, callback)
  })
}
