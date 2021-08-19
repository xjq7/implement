import { sleep } from "../util.js"

export function take(pattern) {
  return {
    isEffect: true,
    type: "take",
    pattern,
  }
}

export function put(action) {
  return {
    isEffect: true,
    type: "put",
    action,
  }
}

export function call(fn, ...args) {
  return {
    isEffect: true,
    type: "call",
    fn,
    args,
  }
}

export function fork(saga) {
  return {
    isEffect: true,
    type: "fork",
    saga,
  }
}

export function select(selector) {
  return {
    isEffect: true,
    type: "select",
    selector,
  }
}

export function all(obj) {
  return {
    isEffect: true,
    type: "all",
    obj,
  }
}

export function cancel(task) {
  return {
    isEffect: true,
    type: "cancel",
    task,
  }
}

export const delay = call.bind(null, sleep)
