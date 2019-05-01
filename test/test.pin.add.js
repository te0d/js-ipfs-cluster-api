const cluster = require('./helpers')
const assert = require('chai').assert

const CID = "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4"

describe('pin.add', () => {
    it('pins a CID in the cluster', (done) => {
        cluster.pin.add(CID, {}, (err) => {
            assert.notExists(err, 'throws error while pinning a CID in the cluster')
            done()
        })
    })
})
