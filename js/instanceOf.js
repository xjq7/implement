function _instanceof(l, r) {
  const f = r.prototype
  while (true) {
    if (l === f) {
      return true
    }
    if (!l) {
      return false
    }
    l = l.__proto__
  }
}