# Events

Simplified dependency free [EventEmitter](https://nodejs.org/api/events.html) as ES6 module with ~60 well readable LOC and ~0.7kb minified footprint for the browser.

## Usage

```js
import { EventEmitter } from '@occami/events'

const observable = new EventEmitter()

observable.on('message', console.log)
observable.emit('message', 'foo', 'bar')
// => foo bar
```

## API - supported methods

```ts
declare type Listener = (...args: any[]) => void

addListener(eventName: string, listener: Listener): EventEmitter
on(eventName: string, listener: Listener): EventEmitter
once(eventName: string, listener: Listener): EventEmitter
emit(eventName: string, ...args: any[]): boolean
removeListener(eventName: string, listener: Listener): EventEmitter
off(eventName: string, listener: Listener): EventEmitter
removeAllListeners(eventName: string): EventEmitter
eventNames(): string[]
listenerCount(eventName: string): number
```
Behaviour as specified in NodeJS [EventEmitter](https://nodejs.org/api/events.html)
