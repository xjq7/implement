Function.prototype.bind2 = function (o) {
  const context = this
  return function () {
    const symbol = Symbol()
    o[symbol] = context
    o[symbol](...arguments)
    delete o[symbol]
  }
}