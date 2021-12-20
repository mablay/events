/*
simplified dependency free ES6 version of NodeJS events
*/

type Listener = (...args:any[])=>void

export class EventEmitter {
  private listeners = new Map<string,Listener[]>()

  addListener (eventName:string, listener:Listener):EventEmitter {
    this.emit('newListener', eventName, listener)
    const listeners = this.listeners.get(eventName) || []
    listeners.push(listener)
    this.listeners.set(eventName, listeners)
    return this
  }

  /** Alias for addListener */
  on (eventName:string, listener:Listener):EventEmitter {
    return this.addListener(eventName, listener)
  }
  once (eventName:string, listener:Listener):EventEmitter {
    const listeners = this.listeners.get(eventName) || []
    const fn = (...args:any[]) => {
      this.removeListener(eventName, fn)
      listener(...args)
    }
    // fn obscures the actual listener from .removeListener()
    fn.$onceFn = listener // identifier for .removeListener()
    listeners.push(fn)
    this.listeners.set(eventName, listeners)
    return this
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  emit (eventName:string, ...args:any[]):boolean {
    const listeners = this.listeners.get(eventName) || []
    // using .slice for shallow copy to ensure that all event listeners are called
    // even if the listeners array is modified by on of the callbacks
    for (const listener of listeners.slice()) {
      listener(...args)
    }
    return listeners.length > 0
  }

  removeListener (eventName:string, listener:Listener):EventEmitter {
    const listeners = this.listeners.get(eventName) || []
    // @ts-ignore
    const index = listeners.findIndex(fn => fn === listener || fn.$onceFn === listener)
    if (~index) listeners.splice(index, 1)
    if (listeners.length === 0) this.listeners.delete(eventName)
    this.emit('removeListener', eventName, listener)
    return this
  }

  /** Alias for removeListener */
  off (eventName:string, listener:Listener):EventEmitter {
    return this.removeListener(eventName, listener)
  }

  removeAllListeners (eventName:string):EventEmitter {
    const listeners = this.listeners.get(eventName) || []
    // loop through the list to emit 'removeListener' on each removal
    for (const listener of listeners.slice()) {
      this.removeListener(eventName, listener)
    }
    return this
  }

  eventNames ():string[] {
    return [...this.listeners.keys()]
  }

  listenerCount (eventName:string):number {
    const listeners = this.listeners.get(eventName) || []
    return listeners.length
  }
}
