/* eslint-env mocha */
'use strict'

var multiaddr = require('multiaddr')
var Id = require('ipfs-peer-id')
var Peer = require('ipfs-peer')
var Swarm = require('ipfs-swarm')
var Ping = require('./../src')

var swarmA
var swarmB
var peerB

beforeEach(function (done) {
  swarmA = new Swarm()
  swarmB = new Swarm()

  swarmB.listen(8101, function () {
    peerB = new Peer(Id.create(), [multiaddr('/ip4/127.0.0.1/tcp/' + swarmB.port)])
    done()
  })
})

afterEach(function (done) {
  swarmB.closeListener()
  done()
})

describe('ping', function () {
  it('ECHO', function (done) {
    Ping.pingEcho(swarmB)

    var p = new Ping(swarmA, peerB)

    p.on('ping', function (time) {
      // console.log(time + 'ms')
      p.stop()
      done()
    })
  })
})
