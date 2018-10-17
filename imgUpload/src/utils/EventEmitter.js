import {isArray} from './isType'
import inArray from './inArray'
import loop from './loop'

export default class EventEmitter {
  constructor () {
    this.events = {}
  }
  on (event, listener) {
    let listeners = this.events[event]
    if (!isArray(listeners)) {
      listeners = this.events[event] = []
    }
    if (!inArray(listeners, listener)) {
      listeners.push(listener)
    }
  }
  emit (event, ...args) {
    const listeners = this.events[event]
    let result = []
    if (listeners && listeners.length) {
      result = loop(listeners, (fn) => {
        try {
          return fn.apply(null, args)
        } catch (e) {
          window.console && window['console'].log(e)
        }        
      })
    }
    return result
  }
}
