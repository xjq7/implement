function channel() {
  let _task = []

  function take(task) {
    _task.push(task)
  }

  function put(type, payload) {
    const cbs = []
    for (const task of _task) {
      if (type === task.pattern) {
        cbs.push(task.cb)
      }
    }
    _task = _task.filter((t) => t.pattern !== type)
    for (const cb of cbs) {
      cb.call(null, payload)
    }
  }
  return {
    take,
    put,
  }
}

export default channel()
