'use strict'

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
