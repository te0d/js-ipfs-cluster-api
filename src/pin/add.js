'use strict'

module.exports = (send) => {
  return util.promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    // TODO:  respect replication_factor option

    var addPath = `pins/${arg}`

    send({
      method: 'POST',
      path: addPath,
      args: opts
    }, callback)
  })
}
