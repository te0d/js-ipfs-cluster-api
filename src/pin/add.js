'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var addPath = `pins/${arg}`

    send({
      method: 'POST',
      path: addPath,
      qs: opts
    }, callback)
  })
}
