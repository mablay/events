# Events

Simplified dependency free ES6 version of NodeJS events

## Usage

```js
import { EventEmitter } from '@occami/events'

const observable = new EventEmitter()

observable.on('message', event => console.log(event))
observable.emit('message', 'foo')
// => foo
```
