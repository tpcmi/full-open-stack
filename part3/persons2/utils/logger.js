// 打印日志的方法整合到一个文件中，方便后续针对日志的调试
const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};
