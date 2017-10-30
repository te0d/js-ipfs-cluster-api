'use strict'

const moduleConfig = require('./utils/module-config')

module.exports = (arg) => {
  const send = moduleConfig(arg)

  return util.promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var recoverPath = `pins/${arg}/recover`

    send({
      method: 'POST',
      path: recoverPath,
      args: opts
    }, callback)
  })
}
