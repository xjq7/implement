//WeakMap解决对象循环引用问题
function deepClone(obj, weakMap = new WeakMap()) {
  if (!(obj instanceof Object)) return obj
  var isArray = obj instanceof Array
  var res = isArray ? [] : {}
  if (!isArray) {
    if (weakMap.get(obj)) return {}
    weakMap.set(obj, {}.toString.call(obj))
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key], weakMap)
    }
  }
  return res
}