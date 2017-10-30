'use strict'

const getConfig = require('./default-config')
const requestAPI = require('./request-api')

module.exports = (arg) => {
  const config = getConfig()

  if (typeof arg === 'function') {
    return arg
  } else if (typeof arg === 'object') {
    return requestAPI(arg)
  } else {
    throw new Error('Argument must be a send function or a config object.')
  }
}
