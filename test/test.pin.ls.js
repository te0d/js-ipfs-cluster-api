const cluster = require('./helpers')
const assert = require('chai').assert

const CID = "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4"

describe('pin.ls', () => {

    it('list details for a pinned CID', (done) => {
        cluster.pin.ls(CID, (err, details) => {
            assert.notExists(err, 'throws error while listing details for a pinned CID')
            done()
        })
    })
})
