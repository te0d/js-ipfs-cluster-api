'use strict'

function getCommands() {
  const cmds = {
    /*
    id: (send) => {
      return util.promisify((opts, callback) => {
        send({
          path: 'id',
          args: opts
        }, callback)
      })
    },
    */
    /*
    peers: {
      ls: {},
      add: {},
      rm: {}
    }
    */
    id: require('../id'),
    version: require('../version'),
    peers: require('../peers')
  }

  return cmds
}

function loadCommands(send) {
  const files = getCommands()
  const cmds = {}

  Object.keys(files).forEach((file) => {
    cmds[file] = files[file](send)
    /*
    cmds[file] = util.promisify((opts, callback) => {
      if (typeof (opts) === 'function') {
        callback = opts
        opts = {}
      }
      send({
        path: 'id', args: opts }, callback)
    });
    */
  })

  return cmds
}

module.exports = loadCommands
