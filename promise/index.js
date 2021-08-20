function Promise(fn) {
  this.state = 'pending'
  this.value = null
  this.callbacks = []
  fn(this._resolve.bind(this), this._reject.bind(this))
}

Promise.prototype._resolve = function (value) {
  if (this.state === 'pending') {
    this.state = 'fullfilled'
    this.value = value
    this.callbacks.forEach((fn) => this._handle(fn))
  }
}

Promise.prototype._reject = function (value) {
  if (this.state === 'pending') {
    this.state = 'rejected'
    this.value = value
    this.callbacks.forEach((fn) => this._handle(fn))
  }
}

Promise.prototype._handle = function (callback) {
  if (this.state === 'pending') {
    this.callbacks.push(callback)
    return
  }
  let cb = this.state === 'fullfilled' ? callback.onFullfilled : callback.onRejected
  if (!cb) {
    cb = this.state === 'fullfilled' ? callback.resolve : callback.reject
    cb(this.value)
    return
  }
  let ret
  try {
    ret = cb(this.value)
    cb = this.state === 'fullfilled' ? callback.resolve : callback.reject
  } catch (error) {
    ret = error
    cb = callback.reject
  } finally {
    cb(ret)
  }
}

Promise.prototype.then = function (onFullfilled, onRejected) {
  return new Promise((resolve, reject) => {
    this._handle({
      onFullfilled: onFullfilled || null,
      onRejected: onRejected || null,
      resolve,
      reject,
    })
  })
}

Promise.prototype.catch = function (onError) {
  return this.then(null, onError)
}


Promise.prototype.finally = function (onFinally) {
  if (typeof onFinally !== 'function') return this.then()
  let promise = this.constructor
  return this.then(
    (value) => promise.resolve(onFinally()).then(() => value),
    (reason) =>
      promise.resolve(onFinally()).then(() => {
        throw reason
      })
  )
}

Promise.resolve = function (value) {
  if (value && value instanceof Promise) {
    return value
  } else if (value && value instanceof Object && value.then instanceof Function) {
    const then = value.then
    return new Promise((resolve) => then(resolve))
  } else {
    return new Promise((resolve) => resolve(value))
  }
}

Promise.reject = function (value) {
  if (value && value instanceof Object && value.then instanceof Function) {
    const then = value.then
    return new Promise((resolve, reject) => then(reject))
  } else {
    return new Promise((resolve, reject) => reject(value))
  }
}

Promise.all = function (promiseList) {
  return new Promise((resolve, reject) => {
    const resList = []
    promiseList.forEach((p, index) => {
      p.then(
        (res) => {
          resList[index] = res
          if (resList.length === arr.length) {
            resolve(resList)
          }
        },
        (err) => reject(err)
      )
    })
  })
}

Promise.race = function (promiseList) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseList.length; i++) {
      Promise.resolve(promiseList[i]).then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    }
  })
}