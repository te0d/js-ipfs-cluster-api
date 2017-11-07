'use strict'

const util = require('util')
const moduleConfig = require('./utils/module-config')

module.exports = (arg) => {
  const send = moduleConfig(arg)

  return util.promisify((cid, callback) => {
    if (typeof cid == 'function') {
      callback = cid
      cid = undefined
    }

    var statusPath = 'pins';
    if (cid) {
      statusPath += '/' + cid;
    }

    send({
      path: statusPath
    }, callback)
  })
}
