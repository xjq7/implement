function newObject() {
  var obj = Object.create(null);
  //去除参数里的构造函数
  const Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
}

function factory(name, age) {
  this.name = name;
  this.age = age;
}

var obj = newObject(factory, "xjq", 23);