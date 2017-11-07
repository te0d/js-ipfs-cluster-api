'use strict'

const Qs = require('qs')
const once = require('once')
const request = require('./request')
const streamToValue = require('./stream-to-value')
const streamToJsonValue = require('./stream-to-json-value')

function parseError (res, callback) {
  const error = new Error(`Server responded with ${res.statusCode}`)

  // streamToJsonValue(res, (err, payload) => {
  streamToValue(res, (err, payload) => {
    if (err) {
      return callback(err)
    }

    if (payload) {
      error.code = payload.Code
      error.message = payload.Message || payload.toString()
    }
    callback(error)
  })
}

function onRes (buffer, callback) {
  return (res) => {
    const isJson = res.headers['content-type'] &&
                   res.headers['content-type'].indexOf('application/json') === 0

    if (res.statusCode >= 400 || !res.statusCode) {
      parseError(res, callback)
    }

    if (isJson) {
      return streamToJsonValue(res, callback)
    }

    return streamToValue(res, callback)
  }
}

function requestAPI (config, options, callback) {
  callback = once(callback)
  options.qs = options.qs || {}

  const method = options.method || 'GET'
  const headers = options.header || {}

  const qs = Qs.stringify(options.qs, {
    arrayFormat: 'repeat',
    encoder: (data, qsDefaultEncoder) => {
      if (Buffer.isBuffer(data)) {
        let uriEncoded = ''
        for (const byte of data) {
          // https://tools.ietf.org/html/rfc3986#page-14
          // ALPHA (%41-%5A and %61-%7A), DIGIT (%30-%39), hyphen (%2D), period (%2E), underscore (%5F), or tilde (%7E)
          if (
              (byte >= 0x41 && byte <= 0x5A) ||
              (byte >= 0x61 && byte <= 0x7A) ||
              (byte >= 0x30 && byte <= 0x39) ||
              (byte === 0x2D) ||
              (byte === 0x2E) ||
              (byte === 0x5F) ||
              (byte === 0x7E)
             ) {
            uriEncoded += String.fromCharCode(byte)
          } else {
            const hex = byte.toString(16)
            // String.prototype.padStart() not widely supported yet
            const padded = hex.length === 1 ? `0${hex}` : hex
            uriEncoded += `%${padded}`
          }
        }
        return uriEncoded
      }
      return qsDefaultEncoder(data)
    }
  })
  const req = request(config.protocol)({
    hostname: config.host,
    path: `${config['api-path']}${options.path}?${qs}`,
    port: config.port,
    method: method,
    headers: headers,
    protocol: `${config.protocol}:`
  }, onRes(options.buffer, callback))

  req.on('error', (err) => {
    callback(err)
  })

  // if (options.files) { stream.pipe(req) }
  if (options.data) {
    req.write(options.data);
  }

  req.end()

  return req
}

exports = module.exports = (config) => {
  const send = (options, callback) => {
    if (typeof options !== 'object') {
      return callback(new Error('no options were passed'))
    }

    return requestAPI(config, options, callback)
  }

  send.andTransform = (options, transform, callback) => {
    return send(options, (err, res) => {
      if (err) {
        return callback(err)
      }
      transform(res, callback)
    })
  }

  return send
}
