'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var rmPath = `peers/${arg}`

    send({
      path: rmPath,
      method: 'DELETE',
      args: opts
    }, callback)
  })
}
