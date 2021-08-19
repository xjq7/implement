import { fork, take } from "./effect.js"

export function takeEvery(pattern, saga) {
  return fork(function* () {
    while (true) {
      yield take(pattern)
      yield fork(saga)
    }
  })
}
