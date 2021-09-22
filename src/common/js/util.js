function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/micromessenger/i) == 'micromessenger') {  // eslint-disable-line
    return true
  } else {
    return false
  }
}

export const isIphoneX = () => {
  if (/iphone/gi.test(window.navigator.userAgent)) {
    let x = (window.screen.width === 375 && window.screen.height === 812);
    let xsMax = (window.screen.width === 414 && window.screen.height === 896);
    let xR = (window.screen.width === 414 && window.screen.height === 896);
    if (x || xsMax || xR) {
      return true;
    } else {
      return false;
    }
  } else {
    return false
  }
}

export function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}