export function debounce(func, delay){
  let timer=null
  return function (...args){
    if (timer) clearTimeout(timer)
    timer =setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}
//时间格式的转换 正则表达式：字符串匹配
export function formatDate(date, fmt) {
  //1.获取年份
  //y+ 一个或多个y  y* 0个或多个y  y? 0个或一个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  //04  0004截取两位 04
  return ('00' + str).substr(str.length);
};
