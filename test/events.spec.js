import { test } from 'zora'
import { EventEmitter } from '../index.js'

test('smoketest', t => {
  const ee = new EventEmitter()
  let foo = 0
  const fn = () => foo++

  ee.on('foo', fn)
  t.equal(ee.listenerCount('foo'), 1, 'count listeners')
  t.equal(ee.eventNames(), ['foo'], 'list event names')

  t.equal(foo, 0, 'do not execute listener on register')
  ee.emit('foo')
  t.equal(foo, 1, 'execute listener on emit')
  ee.emit('foo')
  t.equal(foo, 2, 'execute listener on second emit')

  ee.off('foo', fn)
  t.equal(ee.listenerCount('foo'), 0, 'do not count removed listeners')
  ee.emit('foo')
  t.equal(foo, 2, 'do not execute listener after it has been removed')

  t.equal(ee.listenerCount('bar'), 0, 'do not count bougus listeners')
})

test('once', t => {
  const ee = new EventEmitter()
  let foo = 0
  ee.once('foo', () => foo++)
  t.equal(foo, 0, 'do not execute once-listener on register')
  ee.emit('foo')
  t.equal(foo, 1, 'execute once-listener on first emit')
  ee.emit('foo')
  t.equal(foo, 1, 'do not execute once-listener on second emit')
  t.equal(ee.eventNames().length, 0, 'once-listener gets removed after use')
})

test('newListener event gets emitted before new listener is added', t => {
  const ee = new EventEmitter()
  let foo = 0
  ee.once('newListener', () => {
    ee.on('event', () => {
      t.equal(++foo, 1, 'newListener callback is executed before listener is added')
    })
  })
  ee.on('event', () => {
    t.equal(++foo, 2, 'event callback is added after newListener event is called')    
  })
  ee.emit('event')
})

test('newListener event gets emitted before new listener is added', t => {
  const ee = new EventEmitter()
  let foo = 0
  ee.once('newListener', () => {
    ee.on('event', () => {
      t.equal(++foo, 1, 'newListener callback is executed before listener is added')
    })
  })
  ee.on('event', () => {
    t.equal(++foo, 2, 'event callback is added after newListener event is called')    
  })
  ee.emit('event')
})

test('removeListener', t => {
  const ee = new EventEmitter()
  let foo = 0
  const fn = () => foo++
  ee.once('foo', fn)
  ee.removeListener('foo', fn)
  ee.emit('foo')
  t.equal(foo, 0, 'do not execute removed listeners')
  t.equal(ee.listenerCount('foo'), 0, 'counting no listeners once they are all removed')
  t.equal(ee.eventNames(), [], 'eventName removed once all listeners are removed')
  t.equal(ee.removeListener('bar', fn), ee)
})

test('removeAllListeners', t => {
  const ee = new EventEmitter()
  let foo = 0
  ee.once('foo', () => foo++)
  ee.on('foo', () => foo++)
  ee.removeAllListeners('foo')
  ee.emit('foo')
  t.equal(foo, 0, 'do not execute removed listeners')
  t.equal(ee.listenerCount('foo'), 0, 'counting no listeners once they are all removed')
  t.equal(ee.eventNames(), [], 'eventName removed once all listeners are removed')
  t.equal(ee.removeAllListeners('bar'), ee)
})
