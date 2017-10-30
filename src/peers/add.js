'use strict'

module.exports = (send) => {
  return util.promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }
    send({
      path: 'peers',
      method: 'POST',
      data: arg,
      args: opts
    }, callback)
  })
}
