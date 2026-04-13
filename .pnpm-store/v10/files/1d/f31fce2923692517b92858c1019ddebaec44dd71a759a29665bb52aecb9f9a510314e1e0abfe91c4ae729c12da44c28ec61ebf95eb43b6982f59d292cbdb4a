import objectToString from './staticObjectToString'

function helperCreateInInObjectString (type) {
  return function (obj) {
    return '[object ' + type + ']' === objectToString.call(obj)
  }
}

export default helperCreateInInObjectString
