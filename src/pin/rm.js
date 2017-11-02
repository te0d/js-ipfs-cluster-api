'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var rmPath = `pins/${arg}`

    send({
      path: rmPath,
      method: 'DELETE',
      args: opts
    }, callback)
  })
}
