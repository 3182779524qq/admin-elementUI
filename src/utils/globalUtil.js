//   全局方法
export default class GlobalUtil {

  constructor () {}
  /**
   * 深拷贝
   * @param data
   */
  static deepCopy (data) {
    return JSON.parse(JSON.stringify(data))
  }

  /**
   * 深拷贝
   * @param obj
   */
  static deepClone (obj) {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          //   判断ojb子元素是否为对象，如果是，递归复制
          if (obj[key] && typeof obj[key] === 'object') {
            objClone[key] = this.deepClone(obj[key])
          } else {
            //   如果不是，简单复制
            objClone[key] = obj[key]
          }
        }
      }
    }
    return objClone
  }

  /**
   * setSessionStorage
   */
  static setSessionStorage (key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * getSessionStorage
   */
  static getSessionStorage (key) {
    let result = window.sessionStorage.getItem(key)
    if (result) {
      return JSON.parse(result)
    } else {
      return result
    }
  }

  /**
   * setSessionStorage
   */
  static removeSessionStorage (key) {
    window.sessionStorage.removeItem(key)
  }

  /**
   * setLocalStorage
   */
  static setLocalStorage (key, value) {
    //    console.log(JSON.stringify(value))
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * getLocalStorage
   */
  static getLocalStorage (key) {
    let result = window.localStorage.getItem(key)
    if (result) {
      return JSON.parse(result)
    } else {
      return result
    }
  }

  /**
   * setSessionStorage
   */
  static removeLocalStorage (key) {
    window.localStorage.removeItem(key)
  }

  /**
   * 写cookie
   * @param name
   * @param value
   * @param day
   */
  static setCookie (name, value, day) {
    let days = day
    let exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  }

  /**
   * 读cookie
   * @param name
   * @returns {*}
   */
  static readCookie (name) {
    let arr = null
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (document.cookie && (arr = document.cookie.match(reg))) {
      return unescape(arr[2])
    } else {
      return null
    }
  }

  /**
   * 删除cookie
   * @param name
   */
  static delCookie (name) {
    let cval = this.readCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + (new Date(0)).toGMTString()
    }
  }
}