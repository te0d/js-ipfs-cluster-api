'use strict'

function getCommands() {
  const cmds = {
    id: require('../id'),
    peers: require('../peers'),
    pin: require('../pin'),
    status: require('../status'),
    sync: require('../sync'),
    recover: require('../recover'),
    version: require('../version')
  }

  return cmds
}

function loadCommands(send) {
  const files = getCommands()
  const cmds = {}

  Object.keys(files).forEach((file) => {
    cmds[file] = files[file](send)
  })

  return cmds
}

module.exports = loadCommands
