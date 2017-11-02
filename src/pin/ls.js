'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    // TODO:  add ability to specify specific CID

    send({
      path: 'allocations',
      args: opts
    }, callback)
  })
}
