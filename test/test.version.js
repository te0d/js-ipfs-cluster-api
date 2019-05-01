const cluster = require('./helpers')
const assert = require('chai').assert

describe('version', () => {
    it('shows version', (done) => {
        cluster.version({}, (err, version) => {
            assert.equal(JSON.stringify(version), JSON.stringify({ version: '0.10.1' }), "outputs invalid version")
            assert.notExists(err, 'throws error while fetching cluster peer and ipfs daemon information')
            done()
        })
    })
})
