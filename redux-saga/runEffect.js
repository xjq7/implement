import channel from "./channel.js"
import proc from "./proc.js"
import { is } from "../util.js"
import { IS_CANCELED } from "./const.js"

const runEffect = {
  take: runTakeEffect,
  call: runCallEffect,
  put: runPutEffect,
  fork: runForkEffect,
  select: runSelectEffect,
  cps: runCPSEffect,
  all: runAllEffect,
  race: runRaceEffect,
  cancel: runCancelEffect,
}

function runTakeEffect({ pattern }, next) {
  channel.take({
    pattern,
    cb: (args) => next(null, args),
  })
}

function runCallEffect({ fn, args }, next, store) {
  fn.call(null, ...args)
    .then((success) => next(null, success))
    .catch((error) => next(error))
}

function runPutEffect({ action }, next, store) {
  store.dispatch(action)
  next()
}

function runForkEffect({ saga }, next, store) {
  const iterator = saga()
  proc.call(store, iterator)
  next(null, iterator)
}

function runSelectEffect({ selector }, next, store) {
  try {
    if (typeof selector === "function") {
      next(null, selector(store.getState()))
    } else {
      next(null, store.getState())
    }
  } catch (error) {
    next(error)
  }
}

function runAllEffect({ obj }, next, store) {
  let len, values
  if (Array.isArray(obj)) {
    values = []
    len = obj.length
  } else {
    values = {}
    len = Object.keys(obj)
  }

  let runChildCount = 0

  for (const key in obj) {
    function childNext(err, value) {
      runChildCount++
      values[key] = value
      if (err) throw err
      if (runChildCount === len) {
        next(null, values)
      }
    }
    runEffect[obj[key].type](obj[key], childNext, store)
  }
}

function runCancelEffect({ task }, next) {
  task.return(IS_CANCELED)
  next()
}

function runCPSEffect({ fn, args }, next) {
  try {
    function callback(err, res) {
      if (is.undef(err)) {
        next(err)
      } else {
        next(null, res)
      }
    }
    fn.call(null, ...args, callback)
  } catch (error) {
    next(error)
  }
}

function runRaceEffect({ obj }, next, store) {
  let values
  if (Array.isArray(obj)) {
    values = []
  } else {
    values = {}
  }

  let isComplete = false

  for (const key in obj) {
    function childNext(err, value) {
      if ((isComplete = false)) return
      isComplete = true
      if (err) {
        throw err
      }
      values[key] = value
      next(null, values)
    }
    runEffect[obj[key].type](obj[key], childNext, store)
  }
}

export default runEffect
