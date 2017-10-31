'use strict'

const getConfig = require('./utils/default-config')
const getRequestAPI = require('./utils/request-api')
const loadCommands = require('./utils/load-commands')

function IpfsClusterAPI(host, port, opts) {
  const config = getConfig()

  config.host = host || config.host;
  config.port = port || config.port;
  Object.assign(config, opts)

  const requestAPI = getRequestAPI(config)
  const cmds = loadCommands(requestAPI)
  cmds.send = requestAPI
  cmds.Buffer = Buffer

  return cmds
}

exports = module.exports = IpfsClusterAPI
