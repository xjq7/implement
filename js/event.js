class Event {
  constructor() {
    this.event = {}
    this.maxListener = 5
    this.listenerCount = 0
  }
  on(type, fn) {
    if (this.listenerCount >= this.maxListener) {
      throw new Error('事件数量超限')
    }
    let hasEvent = !!this.event[type]
    if (typeof fn === 'function') {
      if (hasEvent) {
        this.event[type].push(fn)
      } else {
        this.event[type] = [fn]
      }
    }
    if (!hasEvent) this.listenerCount++
  }

  once(type, fn) {
    const _this = this
    function newFn() {
      fn(...arguments)
      _this.removeListener(type, newFn)
    }
    this.on(type, newFn)
  }

  emit(type, params) {
    if (this.event[type]) {
      this.event[type].forEach((fn) => fn(params))
    }
  }

  setMaxListeners(count) {
    this.maxListener = count
  }

  listeners(type) {
    return this.event[type] || []
  }

  removeAllListener(type) {
    this.event[type] = null
  }
  removeListener(type, listener) {
    if (this.event[type]) {
      this.event[type] = this.event[type].filter((fn) => listener !== fn)
    }
  }

  addListener(type, fn) {
    this.on(type, fn)
  }
}

const e = new Event()
function a1() {
  console.log('a1')
}

function a2() {
  console.log('a2')
}

e.once('a', a1)
e.on('a', a2)
e.emit('a')
e.emit('a')
