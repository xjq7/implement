Function.prototype.call2 = function (context) {
  // 首先要获取调用call的函数，用this可以获取
  context.fn = this;
  const obj = [].shift.call(arguments);
  obj.fn(...arguments);
  delete obj.fn;
};