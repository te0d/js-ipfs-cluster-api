const cluster = require('./helpers')
const assert = require('chai').assert

const CID = "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4"

describe('status', () => {
    it('lists current status of tracked CIDs (local state)', (done) => {
        cluster.status(CID, (err, status) => {
            assert.notExists(err, 'throws error while listing current status of tracked CIDs')
            done()
        })
    })
})
