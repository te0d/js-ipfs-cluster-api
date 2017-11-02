'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var peerAddBody = {
      "peer_multiaddress": arg
    }

    send({
      path: 'peers',
      method: 'POST',
      data: JSON.stringify(peerAddBody),
      args: opts
    }, callback)
  })
}
