const cluster = require('./helpers')
const assert = require('chai').assert

const CID = "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4"

describe('recover', () => {
    it('attempts to re-pin/unpin CIDs in error state', (done) => {
        cluster.recover(CID, {}, (err) => {
            assert.notExists(err, 'throws error while attempting to re-pin/unpin CIDs in error state')
            done()
        })
    })
})
