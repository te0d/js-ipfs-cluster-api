const cluster = require('./helpers')
const assert = require('chai').assert

describe('id', () => {
    it('shows cluster peer and ipfs daemon information', (done) => {
        cluster.id({ protocol: 'http' }, (err, details) => {
            assert.notExists(err, 'throws error while fetching cluster peer and ipfs daemon information')
            done()
        })
    })
})
