const cluster = require('./helpers')
const assert = require('chai').assert

const CID = "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4"

describe('pin.rm', () => {
    it('unpins a CID from the cluster', (done) => {
        cluster.pin.rm(CID, {}, (err) => {
            assert.notExists(err, 'throws error while unpinning a CID from the cluster')
            done()
        })
    })
})
