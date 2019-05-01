const cluster = require('./helpers')
const assert = require('chai').assert

describe('peers.add', () => {

    it('throws error while adding a peer with invalid address', (done) => {
        cluster.peers.add("invalid address", {}, (err) => {
            assert.notDeepEqual(err, null, "adds a peer with invlaid address")
            done()
        })
    })

    /* it('adds a cluster peer', (done) => {
        cluster.peers.add("/ip4/1.2.3.4/tcp/1234/<peerid>", {}, (err) => {
            assert.notExists(err, 'throws error while fetching the list of cluster peers')
            done()
        })
    }) */
})
